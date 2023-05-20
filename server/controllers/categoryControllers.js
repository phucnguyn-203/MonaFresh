const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getOneCategory = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.getAllCategory = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Category, req.query).filter();
    const { query, totalPages, currentPage } = await features.paginate();
    const categories = await features.query;
    res.status(200).json({
        status: "success",
        results: categories.length,
        data: categories,
        currentPage: currentPage,
        totalPages: totalPages,
    });
});

exports.createCategory = catchAsync(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        status: "success",
        data: category,
    });
});

exports.updateCategory = catchAsync(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (req.body.isActive === false) {
        await Product.updateMany({ category: req.params.id }, { $set: { isActive: false } }, { multi: true });
    }
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.updateManyCategory = catchAsync(async (req, res) => {
    await Category.updateMany(
        { _id: { $in: req.body.data.categoryIds } },
        { $set: { isActive: req.body.data.isActive } },
        { multi: true },
    );
    await Product.updateMany(
        { category: { $in: req.body.data.categoryIds } },
        { $set: { isActive: false } },
        { multi: true },
    );
    res.status(200).json({
        status: "success",
    });
});

exports.deleteCategory = catchAsync(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ category: req.params.id });
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteManyCategory = catchAsync(async (req, res) => {
    console.log(req.body.data);
    await Category.deleteMany({ _id: { $in: req.body.categoryIds } });
    await Product.deleteMany({ category: { $in: req.body.categoryIds } });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
