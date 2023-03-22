const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/cloudinary");

exports.uploadFile = catchAsync(async (req, res) => {
    const upload = await cloudinary.uploader.upload(req.file.path);
    res.status(201).json({
        status: "success",
        url: upload.url,
    });
});
