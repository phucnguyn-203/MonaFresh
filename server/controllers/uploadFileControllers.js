const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../config/cloudinary");

exports.uploadFile = catchAsync(async (req, res) => {
    const upload = await cloudinary.uploader.upload(req.file.path);
    res.status(201).json({
        status: "success",
        url: upload.url,
    });
});

exports.uploadMutipleFile = catchAsync(async (req, res) => {
    const urls = [];
    const files = req.files;

    for (const file of files) {
        const { path } = file;
        const upload = await cloudinary.uploader.upload(path);
        urls.push(upload.url);
    }

    res.status(201).json({
        status: "success",
        urls: urls,
    });
});
