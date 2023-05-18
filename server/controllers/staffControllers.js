const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { USER_ROLES } = require("../utils/Constant");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createStaff = catchAsync(async (req, res) => {
    const newStaff = await User.create({
        photo: req.body.photo,
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
exports.getAllStaff = catchAsync(async (req, res) => {
    const features = new ApiFeatures(User, req.query).filter().paginate();
    const staffs = await features.query;
    res.status(200).json({
        status: "success",
        results: staffs.length,
        data: staffs,
        currentPage: req.query.page * 1 || 1,
        totalPages: Math.ceil(staffs.length / (req.query.limit || 10)),
    });
});
exports.getOneStaff = catchAsync(async (req, res) => {
    const staff = await User.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: staff,
    });
});
exports.updateStaff = catchAsync(async (req, res) => {
    // const staff = await User.findByIdAndUpdate(req.params.id, updateStaff, { new: true });
    const staff = await User.findById(req.params.id);
    staff.photo = req.body.photo || staff.photo;
    staff.name = req.body.name || staff.name;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    staff.role = req.body.role || staff.role;

    if (req.body.password) {
        staff.password = req.body.password;
        staff.passwordConfirm = req.body.passwordConfirm;
        await staff.save();
        res.status(200).json({
            status: "success",
        });
    }
    await staff.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
    });
});
