const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendToken = require("../utils/sendToken");

const jwt = require("jsonwebtoken");

const signAccessToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
};

const signRefreshToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
};

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    newUser.password = undefined;
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide us your email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Email or Password is incorrect", 401));
    }
    sendToken(res, {
        name: "accessToken",
        token: signAccessToken(user._id, user.role),
        maxAge: 24 * 60 * 60 * 1000,
    });
    sendToken(res, {
        name: "refreshToken",
        token: signRefreshToken(user._id, user.role),
        maxAge: 90 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.checkLogin = catchAsync(async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return next(new AppError("Unauthorized. You are not login. Please login to get access", 401));
    }

    const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);
    res.status(200).json({
        status: "success",
        data: user,
    });
});

exports.getNewAccessToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new AppError("Unauthorized. You are not loin. Please login to get access", 401));
    }
    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    sendToken(res, {
        name: "accessToken",
        token: signAccessToken(decoded._id, decoded.role),
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        status: "success",
        data: null,
    });
});

exports.logout = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
        status: "success",
        data: null,
    });
};
