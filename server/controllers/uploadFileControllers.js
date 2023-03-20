const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/cloudinary");

exports.uploadFile = catchAsync(async (req, res) => {
   
    const upload= await cloudinary.uploader.upload(req.file.path);
    console.log(upload);
    res.status(200).json({
        status: "success",
        URL:upload.url,
    });
});
