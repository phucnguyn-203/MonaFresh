const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    customer_id: {
        type: String,
        //type: Schema.Types.ObjectId,
        //ref: "User",
        required: [true, "Order must have Customer ID"],
    },
    staff_id: {
        type: String,
        // type: Schema.Types.ObjectId,
        // ref: "User",     
    },
    order_detail: [{
        product_id: {
            type: String,
            // type: Schema.Types.ObjectId,
            // ref: "Product",
            required: [true, "Order Detail must have Product ID"],
        },
        quantity: {
            type: Number,
            required: [true, "Order Detail must have Quantity"],
        },
    }],
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
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    }

})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;