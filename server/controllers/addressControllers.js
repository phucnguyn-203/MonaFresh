const catchAsync = require("../utils/catchAsync");
const Province = require("../models/provinceModel");
const District = require("../models/districtModel");
const Ward = require("../models/wardModel");

exports.getAllProvince = catchAsync(async (req, res, next) => {
    const provinces = await Province.find();
    res.status(200).json({
        status: "success",
        results: provinces.length,
        data: provinces,
    });
});

exports.getDistricts = catchAsync(async (req, res) => {
    const provinceCode = req.query.province_code * 1;
    const districts = await District.find({ province_code: provinceCode });
    res.status(200).json({
        status: "success",
        result: districts.length,
        data: districts,
    });
});

exports.getWards = catchAsync(async (req, res, next) => {
    const districtCode = req.query.district_code * 1;
    const wards = await Ward.find({ district_code: districtCode });
    res.status(200).json({
        status: "success",
        result: wards.length,
        data: wards,
    });
});
