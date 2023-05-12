const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrder = catchAsync(async(req, res) => {
    const orders = await Order.find();
    res.status(200).json({
        status: "success",
        data: orders,
    });
});

exports.getOneOrder = catchAsync(async(req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: order,
    });
});

exports.createOrder = catchAsync(async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).json({
        status: "success",
        data: order,
    });
});

exports.updateOrder = catchAsync(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
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