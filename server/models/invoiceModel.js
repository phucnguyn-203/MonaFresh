const mongoose = require("mongoose");
const { Schema } = mongoose;
const { INVOICE_TYPE } = require("../utils/Constant");

const invoiceSchema = new Schema(
    {
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

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
