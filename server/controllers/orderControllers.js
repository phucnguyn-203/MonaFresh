const Order = require("../models/orderModel");
const AppError = require("../utils/AppError");
const ApiFeature = require("../utils/ApiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrder = catchAsync(async (req, res) => {
    const features = new ApiFeature(Order, req.query).filter().sort();
    const { query, totalPages, currentPage } = await features.paginate();
    const orders = await query;
    res.status(200).json({
        status: "success",
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: orders.length,
        data: orders,
    });
});

exports.getOrdersByUserId = catchAsync(async (req, res) => {
    const features = new ApiFeature(Order.find({ customer: req.params.userId }), req.query).filter().sort();
    const { query, totalPages, currentPage } = await features.paginate();
    const orders = await query;
    res.status(200).json({
        status: "success",
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: orders.length,
        data: orders,
    });
});

exports.getOneOrder = catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: order,
    });
});

exports.getMyOrders = catchAsync(async (req, res) => {
    const customerId = req.user._id;
    const features = new ApiFeature(Order.find({ customer: customerId }), req.query).filter().sort();
    const orders = await features.query;
    res.status(200).json({
        status: "success",
        data: orders,
    });
});

exports.createOrder = catchAsync(async (req, res) => {
    const customerId = req.user._id;
    const orderData = req.body;
    orderData.customer = customerId;
    const order = await Order.create(orderData);
    res.status(201).json({
        status: "success",
        data: order,
    });
});

exports.updateOrder = catchAsync(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: order,
    });
});

exports.deleteOrder = catchAsync(async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateIsFeedbackOfOneItem = catchAsync(async (req, res, next) => {
    const _id = req.body._id;
    const itemId = req.body.itemId;

    const order = await Order.findOne({ _id: _id });
    if (!order) {
        return next(new AppError("Không tìm thấy đơn hàng", 404));
    }
    const item = order.orderDetail.find((item) => item._id.toString() === itemId);
    if (!item) {
        return next(new AppError("Sản phẩm không tồn tại trong đơn hàng", 404));
    }
    item.isFeedback = true;
    await order.save();

    res.status(200).json({
        status: "success",
        data: order.orderDetail,
    });
});
