const Invoice = require("../models/invoiceModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const { INVOICE_TYPE } = require("../utils/Constant");

exports.getAllInvoice = catchAsync(async (req, res) => {
    const invoices = await Invoice.find();
    res.status(200).json({
        status: "success",
        data: invoices,
    });
});

exports.getOneOrder = catchAsync(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: invoice,
    });
});

exports.createImportInvoice = catchAsync(async (req, res) => {
    const { products, createdBy } = req.body;
    const newInvoice = new Invoice({
        products: products.map((product) => ({
            product: product.productId,
            quantity: product.quantity,
        })),
        type: INVOICE_TYPE.IMPORT,
        createdBy,
    });

    const invoice = await newInvoice.save();

    const updatePromises = products.map(async (product) => {
        const updatedProduct = await Product.findByIdAndUpdate(
            product.productId,
            { $inc: { quantity: product.quantity } },
            { new: true },
        );
        return updatedProduct;
    });

    await Promise.all(updatePromises);

    res.status(201).json({
        status: "success",
        data: invoice,
    });
});

exports.createExportInvoice = catchAsync(async (req, res) => {
    const { products, createdBy } = req.body;
    const newInvoice = new Invoice({
        products: products.map((product) => ({
            product: product.productId,
            quantity: product.quantity,
        })),
        type: INVOICE_TYPE.EXPORT,
        createdBy,
    });

    const invoice = await newInvoice.save();

    const updatePromises = products.map(async (product) => {
        const updatedProduct = await Product.findByIdAndUpdate(
            product.productId,
            { $inc: { quantity: -product.quantity } },
            { new: true },
        );
        return updatedProduct;
    });

    await Promise.all(updatePromises);

    res.status(201).json({
        status: "success",
        data: invoice,
    });
});

exports.updateInvoice = catchAsync(async (req, res) => {
    const invoiceId = req.params.id;
    const updatedInvoice = await Invoice.findById(invoiceId);
    const { updatedProducts, updatedCreatedBy, type } = req.body;
    const updatePromises = updatedProducts.map(async (product) => {
        const { productId, quantity } = product;
        const currentProduct = await Product.findById(productId);
        const currentInvoice = await Invoice.findById(invoiceId);
        let currentQuantiyProductOfInvoice;
        
        await currentInvoice.products.map( (currentProductOfInvoice) => {
            if(currentProductOfInvoice.product.toString()===productId){
                currentQuantiyProductOfInvoice = currentProductOfInvoice.quantity;
                //currentProductOfInvoice.quantity=quantity;
            }
                
        });
        let updatedQuantity;
        if(type==1){
            updatedQuantity = currentProduct.quantity - currentQuantiyProductOfInvoice + quantity;
            
        }else{
            updatedQuantity = currentProduct.quantity + currentQuantiyProductOfInvoice - quantity;
            
        }
        await currentInvoice.products.map( (currentProductOfInvoice) => {
            if(currentProductOfInvoice.product.toString()===productId){
                currentProductOfInvoice.quantity=quantity;
                currentInvoice.save();
            }
                
        });

        
        
        currentProduct.quantity = updatedQuantity;
        await currentProduct.save();
        return(currentInvoice);
     });

    updatedInvoice.createdBy = updatedCreatedBy;
    
    await Promise.all(updatePromises);
    const newInvoice = await updatedInvoice.save();
    res.status(200).json({
        status: "success",
        data: updatedInvoice,
    });
});


