const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getOneCategory = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.getAllCategory = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Category, req.query).filter().paginate();
    const categories = await features.query;
    res.status(200).json({
        status: "success",
        results: categories.length,
        data: categories,
        currentPage: req.query.page * 1 || 1,
        totalPages: Math.ceil(categories.length / (req.query.limit || 10)),
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
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.deleteCategory = catchAsync(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteManyCategory = catchAsync(async (req, res) => {
    await Category.deleteMany({ _id: { $in: req.body.categoryIds } });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
