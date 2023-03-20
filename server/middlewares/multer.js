const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, res, callback) {
        callback(null, "./public/uploadedFiles");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

module.exports = upload;
