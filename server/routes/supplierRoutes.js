const express = require("express");
const router = express.Router();

const {
    getAllSupplier,
    createSupplier,
    getOneSupplier,
    updateSupplier,
    deleteSupplier,
} = require("../controllers/supplierControllers");

router.get("/", getAllSupplier);
router.get("/:id", getOneSupplier);
router.post("/", createSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;