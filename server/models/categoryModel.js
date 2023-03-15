const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng cung cấp đầy đủ tên của danh mục"],
            unique: true,
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

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
