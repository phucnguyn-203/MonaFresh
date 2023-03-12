const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    items: [
        {
            productId: {
                type: String,
                require: true,
                unique: true,
            },
            quantity: {
                type: Number,
                require: true,
            },
            total: {
                type: Number,
                require: true,
            },
        },
    ],
    customer_id: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
