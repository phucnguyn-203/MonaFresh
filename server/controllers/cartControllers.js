const Cart = require("../models/cartModel");
const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCart = catchAsync(async (req, res) => {
    const cart = await Cart.find();
    res.status(200).json({
        status: "success",
        data: cart,
    });
});

exports.getOneCart = catchAsync(async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: cart,
    });
});

exports.createCart = catchAsync(async (req, res) => {
    const cart = await Cart.create(req.body);
    res.status(201).json({
        status: "success",
        data: cart,
    });
});

exports.updateCart = catchAsync(async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: cart,
    });
});

exports.deleCart = catchAsync(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
