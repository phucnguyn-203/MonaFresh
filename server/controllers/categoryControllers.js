const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getOneCategory = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.getAllCategory = catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        results: categories.length,
        data: categories,
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
