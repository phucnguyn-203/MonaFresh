const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        type: String,
        required: [true, "Vui lòng nhập trạng thái của đơn hàng"],
    },
    payment_status: {
        type: String,
        required: [true, "Vui lòng nhập trạng thái thanh toán của đơn hàng"],
    },
    payment_method: {
        type: String,
        required: [true, "Vui lòng nhập phương thức thanh toán của đơn hàng"],
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
