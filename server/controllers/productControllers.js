const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllProduct = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Product, req.query).filter().sort().limitFields().paginate();
    const products = await features.query;
    res.status(200).json({
        status: "success",
        results: products.length,
        data: products,
        currentPage: req.query.page * 1 || 1,
        totalPages: Math.ceil(products.length / (req.query.limit || 10)),
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
