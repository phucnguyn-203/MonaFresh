const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadFileControllers");

var upload = require("../middlewares/multer.js");

router.post("/", upload.single("file"), uploadFile);

module.exports = router;
