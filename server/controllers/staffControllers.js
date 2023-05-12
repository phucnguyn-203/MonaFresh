const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { USER_ROLES } = require("../utils/Constant");

exports.createStaff = catchAsync(async (req, res) => {
    const newStaff = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: USER_ROLES.STAFF,
    });

    newStaff.password = undefined;
    res.status(201).json({
        status: "success",
        data: {
            staff: newStaff,
        },
    });
});
