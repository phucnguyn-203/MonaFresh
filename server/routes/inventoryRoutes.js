const express = require("express");
const router = express.Router();

const {
    getAllinventory,
    updateInventory,
    createInventory,
    getOneInventory,
} = require("../controllers/invertoryControllers");

router.get("/", getAllinventory);
router.patch("/:id", updateInventory);
router.get("/:id", getOneInventory);
router.post("/", createInventory);

module.exports = router;
