const express = require("express");
const router = express.Router();

const { getAllProvince, getDistricts, getWards } = require("../controllers/addressControllers");

router.get("/provinces", getAllProvince);
router.get("/districts", getDistricts);
router.get("/wards", getWards);
module.exports = router;
