const mongoose = require("mongoose");
const { Schema } = mongoose;

const wardSchema = new Schema({
    name: String,
    code: Number,
    division_type: String,
    codename: String,
    district_code: Number,
});

const Ward = mongoose.model("Ward", wardSchema);
module.exports = Ward;
