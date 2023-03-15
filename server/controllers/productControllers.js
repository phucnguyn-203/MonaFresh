const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: "success",
        results: products.length,
        data: products,
    });
});

exports.getOneProduct = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: product,
    });
});

exports.createProduct = catchAsync(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        status: "success",
        data: product,
    });
});
exports.updateProduct = catchAsync(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: product,
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
