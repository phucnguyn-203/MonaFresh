const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        callback(null, true);
    } else {
        callback({ status: "error", message: "Tệp không được hỗ trợ" }, false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
