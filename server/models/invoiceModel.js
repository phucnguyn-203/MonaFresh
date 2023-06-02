const mongoose = require("mongoose");
const { Schema } = mongoose;
const { INVOICE_TYPE } = require("../utils/Constant");

const invoiceSchema = new Schema(
    {
        searchName: String,
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        type: {
            type: Number,
            enum: [INVOICE_TYPE.IMPORT, INVOICE_TYPE.EXPORT],
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

invoiceSchema.pre("save", function (next) {
    this.searchName = this.searchName + " " + this._id.toString();
    
    next();
});
invoiceSchema.pre(/^find/, function (next) {
    this.populate({
        path: "createdBy",
        select: "name",
    });
    next();
});
const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
