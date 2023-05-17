const Feedback = require("../models/feedbackModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllFeedback = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Feedback.find({ product: req.params.productId }), req.query).filter().sort();
    const feedbacks = await features.query;
    res.status(200).json({
        status: "success",
        results: feedbacks.length,
        data: feedbacks,
    });
});

exports.setTourUserIds = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.customer) req.body.customer = req.user._id;
    next();
};

exports.getOneFeedback = catchAsync(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: feedback,
    });
});

exports.createFeedback = catchAsync(async (req, res) => {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({
        status: "success",
        data: feedback,
    });
});

exports.updateFeedback = catchAsync(async (req, res) => {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: feedback,
    });
});

exports.deleteFeedback = catchAsync(async (req, res) => {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
