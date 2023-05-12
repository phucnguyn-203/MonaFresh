const mongoose = require("mongoose");
const { Schema } = mongoose;

const provinceSchema = new Schema({
    name: String,
    code: Number,
    division_type: String,
    codename: String,
    phone_code: Number,
});

const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
