const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Sản phẩm phải có tên"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Sản phẩm phải có mô tả"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Sản phẩm phải có giá"],
    },
    percentageDiscount: {
        type: Number,
        min: 0,
        max: 100,
    },
    thumbnail: {
        type: String,
        required: [true, "Sản phẩm phải có ảnh đại diện"],
    },
    images: {
        type: [String],
        required: [true, "Sản phẩm phải có ảnh"],
    },
    rating: {
        type: Number,
        required: [true, "Sản phẩm phải có rating"],
    },
    quantity: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
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
