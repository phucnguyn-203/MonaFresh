const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng cung cấp đầy đủ tên sản phẩm"],
            unique: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Vui lòng cung cấp danh mục của sản phẩm"],
        },
        description: {
            type: String,
            required: [true, "Vui lòng cung cấp mô tả của sản phẩm"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Vui lòng cung cấp giá của sản phẩm"],
        },
        percentageDiscount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        thumbnail: {
            type: String,
            required: [true, "Vui lòng cung cấp thumnail cho sản phẩm"],
        },
        images: [String],
        ratingsAverage: {
            type: Number,
            max: 5,
            default: 0,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        quantity: Number,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
