const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllCustomer = catchAsync(async (req, res) => {
    console.log(req.user);
    const features = new ApiFeatures(User.find(), req.query).filter();
    const { query, totalPages, currentPage } = await features.paginate();
    const customers = await features.query;
    res.status(200).json({
        status: "success",
        results: customers.length,
        data: customers,
        currentPage: currentPage,
        totalPages: totalPages,
    });
});
