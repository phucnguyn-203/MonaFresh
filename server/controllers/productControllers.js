const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllProduct = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Product, req.query).filter().sort().limitFields();
    const { query, totalPages, currentPage } = await features.paginate();
    const products = await query;
    res.status(200).json({
        status: "success",
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: products.length,
        data: products,
    });
});

exports.getSimilarProducts = catchAsync(async (req, res) => {
    const features = new ApiFeatures(
        Product.find({
            $and: [{ category: req.query.category }, { _id: { $ne: req.query._id } }],
        }),
        req.query,
    );
    const products = await features.query;
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
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: product,
    });
});
exports.updateManyProduct = catchAsync(async (req, res) => {
    await Product.updateMany(
        { _id: { $in: req.body.data.productIds } },
        { $set: { isActive: req.body.data.isActive } },
        { multi: true },
    );
    res.status(200).json({
        status: "success",
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteManyProduct = catchAsync(async (req, res) => {
    await Product.deleteMany({ _id: { $in: req.body.productIds } });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
