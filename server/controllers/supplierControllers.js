const Supplier = require("../models/supplierModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllSupplier = catchAsync(async (req, res) => 
{
    const suppliers = await Supplier.find();
    res.status(200).json({
        status: "success",
        data: suppliers,
    })
});

exports.getOneSupplier = catchAsync(async(req, res) => 
{
    const supplier = await Supplier.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: supplier,
    })
});

exports.createSupplier = catchAsync(async(req, res) => 
{
    const supplier = await Supplier.create(req.body);
    res.status(201).json({
        status: "success",
        data: supplier,
    })
});

exports.updateSupplier = catchAsync(async(req, res) => 
{
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    res.status(200).json({
        status: "success",
        data: supplier,
    })
});

exports.deleteSupplier = catchAsync(async(req, res) => 
{
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    })
});