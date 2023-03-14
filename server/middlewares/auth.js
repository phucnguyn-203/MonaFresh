const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.authenticate = catchAsync(async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return next(new AppError("Unauthorized. You are not login. Please login to get access", 401));
    }

    const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist"), 401);
    }
    req.user = currentUser;
    next();
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action!", 403));
        }
        next();
    };
};
