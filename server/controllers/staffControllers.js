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
    console.log(req.user)
    const features = new ApiFeatures(User.find({_id: {$ne:req.user._id}}), req.query).filter();
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
exports.updateStaffStatus = catchAsync(async (req, res) => {
    console.log(req.params);
    console.log(req.body)
    const staff = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
        status: "success",
        data: staff,
    })
});
exports.updateManyStaffStatus = catchAsync(async (req, res) => {
    console.log(req.body)
    await User.updateMany(
        {_id: {$in: req.body.data.staffIds}},
        {$set: {isActive: req.body.data.isActive}},
        {multi: true},
    );
    res.status(200).json({
        status: "success",
    });
});
exports.deleteStaff = catchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
    });
});
exports.deleteManyStaff = catchAsync(async (req, res) => {
    await User.deleteMany({_id: {$in: req.body.data.staffIds}});
    res.status(204).json({
        status: "success",
    });
});
