const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Nhận xét phải thuộc về 1 người dùng"],
        },
        content: {
            type: String,
            required: true,
        },
        unread: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

notificationSchema.pre(/^find/, function (next) {
    this.populate({
        path: "customer",
        select: "name photo",
    }).sort("-createdAt");
    next();
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
