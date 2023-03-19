const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Vui lòng nhập ID của sản phẩm"],
            },
            quantity: {
                type: Number,
                required: [true, "Vui lòng nhập số lượng sản phẩm"],
            },
            total: {
                type: Number,
                required: true,
            },
        },
    ],
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Vui lòng nhập ID của khách hàng"],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
