const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.authenticate = catchAsync(async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return next(new AppError("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục truy cập", 401));
    }

    const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
        return next(new AppError("Token thuộc về người dùng không tồn tại"), 401);
    }

    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError("Bạn đã thay đổi mật khẩu gần đây. Vui lòng đăng nhập lại", 401));
    }
    req.user = currentUser;
    next();
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Bạn không được phép truy cập vào tài nguyên này", 403));
        }
        next();
    };
};
