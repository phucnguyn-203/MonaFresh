const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotifications = catchAsync(async (req, res) => {
    const notifications = await Notification.find();
    res.status(200).json({
        status: "success",
        data: notifications,
    });
});

exports.updateNotification = catchAsync(async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { unread: false }, { new: true });
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
