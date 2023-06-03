const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Supplier = require("../models/supplierModel");
const Invoice = require("../models/invoiceModel");
const ExcelJS = require("exceljs");
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
        { $match: { status: ORDER_STATUS.DELIVERED } },
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

exports.getExportExcel = catchAsync(async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const categorySheet = workbook.addWorksheet("Danh Mục");
    const categories = await Category.find();
    categorySheet.columns = [
        { header: "Mã danh mục", key: "_id", width: 30 },
        { header: "Tên danh mục", key: "name", width: 30 },
        { header: "Còn kinh doanh", key: "isActive", width: 15 },
    ];
    categories.forEach((category) => {
        categorySheet.addRow(category);
    });

    const productSheet = workbook.addWorksheet("Sản phẩm");
    const products = await Product.find().populate("category").populate("supplier");

    productSheet.columns = [
        { header: "Mã sản phẩm", key: "_id", width: 30 },
        { header: "Tên", key: "name", width: 30 },
        { header: "Danh mục", key: "categoryName", width: 30 },
        { header: "Nhà cung cấp", key: "supplierName", width: 30 },
        { header: "Giá bán", key: "price", width: 15 },
        { header: "Giá nhập", key: "importPrice", width: 15 },
        { header: "Số lượng trong kho", key: "quantity", width: 15 },
        { header: "Còn bán", key: "isActive", width: 15 },
    ];

    products.forEach((product) => {
        const rowData = {
            _id: product._id,
            name: product.name,
            categoryName: product.category.name,
            supplierName: product.supplier.name,
            price: product.price,
            importPrice: product.importPrice,
            quantity: product.quantity,
            isActive: product.isActive,
        };
        productSheet.addRow(rowData);
    });

    const supplierSheet = workbook.addWorksheet("Nhà cung cấp");
    const suppliers = await Supplier.find();
    supplierSheet.columns = [
        { header: "Mã nhà cung cấp", key: "_id", width: 30 },
        { header: "Tên nhà cung cấp", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Địa chỉ", key: "address", width: 30 },
        { header: "Số điện thoại", key: "phone", width: 15 },
        { header: "Còn hoạt động", key: "isActive", width: 15 },
    ];
    suppliers.forEach((supplier) => {
        supplierSheet.addRow(supplier);
    });

    const customerSheet = workbook.addWorksheet("Khách hàng");
    customerSheet.columns = [
        { header: "Mã khách hàng", key: "_id", width: 30 },
        { header: "Tên khách hàng", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Điện thoại", key: "phone", width: 15 },
        { header: "Ngày tạo tài khoản", key: "createdAt", width: 15 },
        { header: "Còn hoạt động", key: "isActive", width: 15 },
    ];

    const customers = await User.find({ role: USER_ROLES.CUSTOMER });
    customers.forEach((customer) => {
        const rowData = {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            createdAt: new Date(customer.createdAt),
            isActive: customer.isActive,
        };
        customerSheet.addRow(rowData);
    });

    const invoiceSheet = workbook.addWorksheet("Hoá đơn nhập");
    const invoices = await Invoice.find().populate("createdBy");
    invoiceSheet.columns = [
        { header: "Mã hoá đơn", key: "_id", width: 30 },
        { header: "Tên sản phẩm", key: "name", width: 30 },
        { header: "Giá Nhập", key: "price", width: 15 },
        { header: "Số Lượng", key: "quantity", width: 15 },
        { header: "Tổng", key: "total", width: 15 },
        { header: "Nhập bởi", key: "createdBy.name", width: 30 },
    ];

    invoiceSheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    const highlightedColumns = ["price", "total"];
    highlightedColumns.forEach((column) => {
        const columnObj = invoiceSheet.getColumn(column);
        columnObj.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF00" },
            };
        });
    });

    let totalImportAmount = 0;

    invoices.forEach((invoice) => {
        invoice.products.forEach((product) => {
            const row = {
                _id: invoice._id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                total: product.price * product.quantity,
                "createdBy.name": invoice.createdBy.name,
            };
            totalImportAmount += row.total;
            invoiceSheet.addRow(row);
        });
    });

    // Add the total import amount row at the end
    invoiceSheet.addRow(["", "", "", "", "Tổng Số Tiền:", totalImportAmount]);

    const productSellingQuantity = await Order.aggregate([
        { $match: { status: ORDER_STATUS.DELIVERED } },
        { $unwind: "$orderDetail" },
        {
            $group: {
                _id: "$orderDetail.product",
                totalQuantity: { $sum: "$orderDetail.quantity" },
                productName: { $first: "$orderDetail.name" },
            },
        },
        { $sort: { totalQuantity: -1 } },
    ]);

    const productSellingQuantitySheet = workbook.addWorksheet("Số lượng sản phẩm đã bán");

    // Set up worksheet headers
    productSellingQuantitySheet.columns = [
        { header: "Tên sản phẩm", key: "productName", width: 40 },
        { header: "Số lượng bán", key: "totalQuantity", width: 15 },
    ];

    // Add data to worksheet
    productSellingQuantity.forEach((product) => {
        productSellingQuantitySheet.addRow(product);
    });

    const customersWithMostOrders = await Order.aggregate([
        { $match: { status: ORDER_STATUS.DELIVERED } },
        {
            $group: {
                _id: "$customer",
                totalOrders: { $sum: 1 },
            },
        },
        { $sort: { totalOrders: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "customerInfo",
            },
        },
        {
            $unwind: "$customerInfo",
        },
        {
            $project: {
                _id: 0,
                Customer: "$customerInfo.name",
                "Total Orders": "$totalOrders",
            },
        },
    ]);

    const customersWithMostOrdersSheet = workbook.addWorksheet("Danh sách khách hàng thân thiết");
    customersWithMostOrdersSheet.columns = [
        { header: "Tên khách hàng", key: "Customer", width: 20 },
        { header: "Số đơn hàng thành công", key: "Total Orders", width: 15 },
    ];
    customersWithMostOrders.forEach((customer) => {
        customersWithMostOrdersSheet.addRow(customer);
    });

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

    const profitInMonthSheet = workbook.addWorksheet(`Doanh thu theo tháng(${currentYear})`);
    profitInMonthSheet.columns = [
        { header: "Tháng", key: "month", width: 10 },
        { header: "Doanh Thu", key: "totalProfit", width: 15 },
    ];

    Object.keys(monthlyProfitData).forEach((month) => {
        const data = monthlyProfitData[month];
        profitInMonthSheet.addRow([month, data]);
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');

    workbook.xlsx.write(res).then(() => {
        res.end();
    });
});
