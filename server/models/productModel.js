const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Sản phẩm phải có tên"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Sản phẩm phải có mô tả"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Sản phẩm phải có giá"],
    },
    percentageDiscount: {
        type: Number,
    },
    thumbnail: {
        type: String,
        required: [true, "Sản phẩm phải có ảnh đại diện"],
        unique: true,
    },
    images: {
        type: [String],
        required: [true, "Sản phẩm phải có ảnh"],
    },
    rating: {
        type: Number,
        required: [true, "Sản phẩm phải có rating"],
    },
    quantity: {
        type: Number,
        required: [true, "Sản phẩm phải có số lượng"],
    },
    // feedback:
    // {
    //     type: [String],
    //     required: [true, "Sản phẩm phải có feedback"],

    // },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
