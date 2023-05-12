const mongoose = require("mongoose");
const { Schema } = mongoose;

const districtSchema = new Schema({
    name: String,
    code: Number,
    division_type: String,
    codename: String,
    province_code: Number,
});

const District = mongoose.model("District", districtSchema);
module.exports = District;
