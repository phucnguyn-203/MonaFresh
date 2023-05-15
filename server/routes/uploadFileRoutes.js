const express = require("express");
const router = express.Router();
const { uploadFile, uploadMutipleFile } = require("../controllers/uploadFileControllers");

const upload = require("../middlewares/multer.js");

router.post("/", upload.single("file"), uploadFile);
router.post("/upload-files", upload.array("files"), uploadMutipleFile);
module.exports = router;
