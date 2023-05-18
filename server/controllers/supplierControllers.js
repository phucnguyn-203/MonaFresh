const Supplier = require("../models/supplierModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllSupplier = catchAsync(async (req, res) => {
    // const suppliers = await Supplier.find();
    const features = new ApiFeatures(Supplier, req.query).filter().paginate();
    const suppliers = await features.query;
    res.status(200).json({
        status: "success",
        results: suppliers.length,
        data: suppliers,
        currentPage: req.query.page * 1 || 1,
        totalPages: Math.ceil(suppliers.length / req.query.limit || 10),
    });
});

exports.getOneSupplier = catchAsync(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: supplier,
    });
});

exports.createSupplier = catchAsync(async (req, res) => {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({
        status: "success",
        data: supplier,
    });
});

exports.updateSupplier = catchAsync(async (req, res) => {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    res.status(200).json({
        status: "success",
        data: supplier,
    });
});

exports.updateManySupplier = catchAsync(async (req, res) => {
    await Supplier.updateMany(
        {_id: { $in: req.body.data.supplierIds}},
        { $set : { isActive: req.body.data.isActive }},
        {multi: true}
    );
    res.status(200).json({
        status: "success",
    });
})

exports.deleteSupplier = catchAsync(async (req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteManySupplier = catchAsync(async (req, res) => {
    await Supplier.deleteMany({ _id: { $in: req.body.supplierIds } });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
