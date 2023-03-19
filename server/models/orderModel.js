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
        enum: ["Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao", "Đã huỷ", "Trả hàng"],
        default: "Chờ xác nhận",
    },
    payment_status: {
        type: String,
        required: [true, "Vui lòng nhập trạng thái thanh toán của đơn hàng"],
        enum: ["Chưa thanh toán", "Đã thanh toán"],
        default: "Chưa thanh toán",
    },
    payment_method: {
        type: String,
        required: [true, "Vui lòng nhập phương thức thanh toán của đơn hàng"],
        enum: ["Cod", "Online"],
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
