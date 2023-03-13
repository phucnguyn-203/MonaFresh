const Inventory = require("../models/inventoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllinventory = catchAsync(async (req, res) => {
    const inventorys = await Inventory.find();
    res.status(200).json({
        status: "success",
        data: invertorys,
    });
});

exports.getOneInventory = catchAsync(async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: inventory,
    });
});

exports.createInventory = catchAsync(async (req, res) => {
    const inventory = await Inventory.create(req.body);
    res.status(201).json({
        status: "success",
        data: inventory,
    });
});

exports.updateInventory = catchAsync(async (req, res) => {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: inventory,
    });
});
