const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Order must have Customer ID"],
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
                required: [true, "Order Detail must have Product ID"],
            },
            quantity: {
                type: Number,
                required: [true, "Order Detail must have Quantity"],
            },
        },
    ],
    total: {
        type: Number,
        required: [true, "Order Detail must have Total"],
    },
    status: {
        type: String,
        required: [true, "Order Detail must have Status"],
    },
    payment_status: {
        type: String,
        required: [true, "Order Detail must have Payment Status"],
    },
    payment_method: {
        type: String,
        required: [true, "Order Detail must have Payment Method"],
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
