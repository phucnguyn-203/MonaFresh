const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                require: true,
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
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
        unique: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
