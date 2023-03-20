const mongoose = require("mongoose");
const { Schema } = mongoose;
const { STATUS } = require("../utils/Constant");
const { PAYMENT_STATUS } = require("../utils/Constant");
const { PAYMENT_METHOD } = require("../utils/Constant");

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Vui lòng nhập ID của khách hàng"],
    },
    staff: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    orderDetail: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Vui lòng nhập ID của sản phẩm"],
            },
            quantity: {
                type: Number,
                required: [true, "Vui lòng nhập số lượng của sản phẩm"],
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: [true, "Vui lòng nhập trạng thái của đơn hàng"],
        enum: [STATUS.PENDING, STATUS.CONFIRMED, STATUS.DELIVERING, STATUS.DELIVERED, STATUS.CANCELED, STATUS.RETURNS],
        default: STATUS.PENDING,
    },
    payment_status: {
        type: Number,
        required: [true, "Vui lòng nhập trạng thái thanh toán của đơn hàng"],
        enum: [PAYMENT_STATUS.UNPAID, PAYMENT_STATUS.PAID],
        default: PAYMENT_STATUS.UNPAID,
    },
    payment_method: {
        type: Number,
        required: [true, "Vui lòng nhập phương thức thanh toán của đơn hàng"],
        enum: [PAYMENT_METHOD.ONL, PAYMENT_METHOD.COD],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
