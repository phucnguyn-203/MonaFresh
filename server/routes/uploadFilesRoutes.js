const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/uploadFileControllers");
const router = express.Router();

var upload = require("../middlewares/multer.js");

router.post("/", upload.single("filetoupload"), uploadFile);

module.exports = router;
