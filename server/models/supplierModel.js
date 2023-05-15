const mongoose = require("mongoose");
const removeAccents = require("../utils/removeAccents");
const { Schema } = mongoose;

const supplierSchema = new Schema(
    {
        searchName: String,
        name: {
            type: String,
            required: [true, "Nhà cung cấp phải có tên"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Nhà cung cấp phải có tên người liên hệ"],
            trim: true,
        },
        address: {
            type: String,
            required: [true, "Nhà cung cấp phải có địa chỉ"],
        },
        phone: {
            type: String,
            required: [true, "Nhà cung cấp phải có SĐT"],
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

supplierSchema.pre("save", function (next) {
    this.searchName = removeAccents(this.name).toLowerCase();
    next();
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
