const mongoose = require("mongoose");
const { Schema } = mongoose;
const removeAccents = require("../utils/removeAccents");

const categorySchema = new Schema(
    {
        searchName: String,
        name: {
            type: String,
            required: [true, "Vui lòng cung cấp đầy đủ tên của danh mục"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

categorySchema.pre("save", function (next) {
    this.searchName = removeAccents(this.name).toLowerCase();
    next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
