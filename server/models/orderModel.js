const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } = require("../utils/Constant");
const removeAccents = require("../utils/removeAccents");

const orderSchema = new Schema(
    {
        srearchName: String,
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Vui lòng cung cấp thông tin khách hàng"],
        },
        staff: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        orderDetail: {
            type: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "Product",
                        required: [true, "Vui lòng cung cấp thông tin sản phẩm"],
                    },
                    quantity: {
                        type: Number,
                        required: [true, "Vui lòng nhập số lượng của sản phẩm"],
                    },
                    total: {
                        type: Number,
                        required: true,
                    },
                    isFeedback: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
            required: true,
        },
        orderTotal: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            enum: [
                ORDER_STATUS.PENDING,
                ORDER_STATUS.CONFIRMED,
                ORDER_STATUS.DELIVERING,
                ORDER_STATUS.DELIVERED,
                ORDER_STATUS.CANCELED,
                ORDER_STATUS.RETURNS,
            ],
            default: ORDER_STATUS.PENDING,
        },
        paymentStatus: {
            type: Number,
            enum: [PAYMENT_STATUS.UNPAID, PAYMENT_STATUS.PAID],
            default: PAYMENT_STATUS.UNPAID,
        },
        paymentMethod: {
            type: Number,
            required: [true, "Vui lòng chọn phương thức thanh toán của đơn hàng"],
            enum: [PAYMENT_METHOD.ONL, PAYMENT_METHOD.COD],
            default: PAYMENT_METHOD.COD,
        },
        deliveryAddress: {
            type: {
                name: String,
                phone: String,
                province: String,
                district: String,
                ward: String,
                addressDetail: String,
                note: String,
            },
            required: true,
        },
    },
    {
        timestamps: true,
    },
    
);

orderSchema.pre("save", function (next) {
    this.searchName = this._id.toString();
    console.log(this.searchName);
    next();
});

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: "orderDetail.product",
        select: "name thumbnail price percentageDiscount -category",
    }).populate({
        path: "staff",
        select: "name",
    });
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
