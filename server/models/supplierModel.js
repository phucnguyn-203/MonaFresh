const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplierSchema = new Schema({
    idCompany:{
        type: String,
        required: [true, "Nhà cung cấp phải có mã riêng"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Nhà cung cấp phải có tên"],
        unique: true,
        trim: true,
    },
    contact:{
        type: String,
        required: [true, "Nhà cung cấp phải có tên người liên hệ"],
        trim: true,
    },
    address:
    {
        type: String,
        required: [true, "Nhà cung cấp phải có địa chỉ"],
    },
    phone:
    {
        type: String,
        required: [true, "Nhà cung cấp phải có SĐT"],
        unique: true,
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;