const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("../models/productModel");

const feedbackSchema = new Schema(
    {
        feedback: {
            type: String,
            trim: true,
            required: [true, "Vui lòng nhập nhận xét của bạn"],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Nhận xét phải thuộc về 1 sản phẩm"],
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Nhận xét phải thuộc về 1 người dùng"],
        },
    },
    {
        timestamps: true,
    },
);

feedbackSchema.pre(/^find/, function (next) {
    this.populate({
        path: "customer",
        select: "name photo",
    });
    next();
});

feedbackSchema.statics.calcAverageRatings = async function (productId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId },
        },
        {
            $group: {
                _id: "$product",
                numberRatings: { $sum: 1 },
                averageRatings: { $avg: "$rating" },
            },
        },
    ]);

    await Product.findByIdAndUpdate(productId, {
        ratingsAverage: stats[0].averageRatings,
        ratingsQuantity: stats[0].numberRatings,
    });
};

feedbackSchema.pre("save", function (next) {
    this.constructor.calcAverageRatings(this.product);
    next();
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
