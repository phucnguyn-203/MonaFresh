const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Feedback must have Product ID"],
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Feedback must have User ID"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,  
    }
})

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;