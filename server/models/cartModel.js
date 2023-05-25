const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Vui lòng cung cấp thông tin khách hàng"],
            unique: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Vui lòng cung cấp thông tin sản phẩm"],
                },
                quantity: {
                    type: Number,
                    required: [true, "Vui lòng nhập số lượng sản phẩm"],
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "items.product",
        select: "name thumbnail price percentageDiscount -category isActive",
    });
    next();
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
