const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const { ORDER_STATUS, USER_ROLES } = require("../utils/Constant");
const catchAsync = require("../utils/catchAsync");

exports.getTodayProfit = catchAsync(async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const pipeline = [
        {
            $match: {
                updatedAt: { $gte: startOfDay, $lt: endOfDay },
                status: ORDER_STATUS.DELIVERED,
            },
        },
        {
            $unwind: "$orderDetail",
        },
        {
            $lookup: {
                from: "products",
                localField: "orderDetail.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $addFields: {
                salePrice: {
                    $multiply: ["$orderDetail.price", { $subtract: [1, "$orderDetail.percentageDiscount"] }],
                },
            },
        },
        {
            $addFields: {
                profit: {
                    $multiply: [{ $subtract: ["$salePrice", "$orderDetail.importPrice"] }, "$orderDetail.quantity"],
                },
            },
        },
        {
            $group: {
                _id: null,
                totalProfit: { $sum: "$profit" },
            },
        },
        {
            $project: {
                _id: 0,
                todayProfit: "$totalProfit",
            },
        },
    ];
    const [result] = await Order.aggregate(pipeline);
    const todayProfit = result ? result.todayProfit : 0;
    res.status(200).json({
        status: "success",
        data: {
            todayProfit,
        },
    });
});

exports.getTotalCustomer = catchAsync(async (req, res) => {
    const totalCustomer = await User.find({ role: USER_ROLES.CUSTOMER }).count();
    res.status(200).json({
        status: "success",
        data: {
            totalCustomer,
        },
    });
});

exports.getTotalProduct = catchAsync(async (req, res) => {
    const totalProduct = await Product.find().count();
    res.status(200).json({
        status: "success",
        data: {
            totalProduct,
        },
    });
});

exports.getTotalProductsOutofStock = catchAsync(async (req, res) => {
    const totalProductsOutofStock = await Product.find({ quantity: 0 }).count();
    res.status(200).json({
        status: "success",
        data: {
            totalProductsOutofStock,
        },
    });
});

exports.getOrdersStatistic = catchAsync(async (req, res) => {
    const pipeline = [
        {
            $group: {
                _id: null,
                totalOrder: { $sum: 1 },
                totalOrderIsPending: { $sum: { $cond: [{ $eq: ["$status", ORDER_STATUS.PENDING] }, 1, 0] } },
                totalOrderOrderIsDelivering: { $sum: { $cond: [{ $eq: ["$status", ORDER_STATUS.DELIVERING] }, 1, 0] } },
                totalOrderHaveDelivered: { $sum: { $cond: [{ $eq: ["$status", ORDER_STATUS.DELIVERED] }, 1, 0] } },
            },
        },
        {
            $project: {
                _id: 0,
                totalOrder: 1,
                totalOrderIsPending: 1,
                totalOrderOrderIsDelivering: 1,
                totalOrderHaveDelivered: 1,
            },
        },
    ];

    const [result] = await Order.aggregate(pipeline);
    const response = result
        ? result
        : { totalOrderToday: 0, totalOrderIsPending: 0, totalOrderOrderIsDelivering: 0, totalOrderHaveDelivered: 0 };
    res.status(200).json({
        status: "success",
        data: response,
    });
});

exports.getTopSellingProducts = catchAsync(async (req, res) => {
    const result = await Order.aggregate([
        { $unwind: "$orderDetail" },
        {
            $group: {
                _id: "$orderDetail.product",
                totalQuantity: { $sum: "$orderDetail.quantity" },
                productName: { $first: "$orderDetail.name" },
            },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 },
    ]);

    const topSellingProducts = result.map((item) => ({
        productName: item.productName,
        totalQuantity: item.totalQuantity,
    }));

    res.status(200).json({
        status: "success",
        data: topSellingProducts,
    });
});

exports.getProfitInMonth = catchAsync(async (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-based index

    const profitData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(currentYear, currentMonth, 0, 23, 59, 59), // Filter orders up to the last day of the current month
                },
                status: ORDER_STATUS.DELIVERED,
            },
        },
        {
            $unwind: "$orderDetail",
        },
        {
            $lookup: {
                from: "products",
                localField: "orderDetail.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $addFields: {
                salePrice: {
                    $multiply: ["$orderDetail.price", { $subtract: [1, "$orderDetail.percentageDiscount"] }],
                },
            },
        },
        {
            $addFields: {
                profit: {
                    $multiply: [{ $subtract: ["$salePrice", "$orderDetail.importPrice"] }, "$orderDetail.quantity"],
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                totalProfit: { $sum: "$profit" },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                year: "$_id.year",
                totalProfit: 1,
            },
        },
    ]);

    // Generate the profit data for each month from January to the current month
    const monthlyProfitData = {};
    for (let month = 1; month <= currentMonth; month++) {
        monthlyProfitData[month] = 0;
    }
    profitData.forEach((data) => {
        const { month, totalProfit } = data;
        monthlyProfitData[month] = totalProfit;
    });

    res.status(200).json({
        status: "success",
        data: monthlyProfitData,
    });
});
