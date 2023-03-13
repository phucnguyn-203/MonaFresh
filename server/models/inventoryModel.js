const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    staff_name: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
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

            supp_name: {
                type: Schema.Types.ObjectId,
                ref: "Supplier",
                require: true,
            },
            total: {
                type: Number,
                require: true,
            },
        },
    ],
    total_quantity: {
        type: Number,
        require: true,
    },
    total_price: {
        type: Number,
        require: true,
    },
});

const Invertory = mongoose.model("Inventory", inventorySchema);
module.exports = Invertory;
