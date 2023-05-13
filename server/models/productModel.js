const mongoose = require("mongoose");
const { Schema } = mongoose;
const removeAccents = require("../utils/removeAccents");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng cung cấp đầy đủ tên sản phẩm"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        searchName: String,
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Vui lòng cung cấp danh mục của sản phẩm"],
        },
        description: {
            type: String,
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
    { collation: { locale: "vi", strength: 2 }, timestamps: true },
);

productSchema.pre("save", function (next) {
    this.searchName = removeAccents(this.name).toLowerCase();
    next();
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name",
    });
    next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
