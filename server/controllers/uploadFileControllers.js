const catchAsync = require("../utils/catchAsync");

exports.uploadFile = catchAsync(async (req, res) => {
    console.log(req.file.path);
    res.status(200).json({
        status: "success",
    });
});
