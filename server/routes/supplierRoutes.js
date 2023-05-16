const express = require("express");
const router = express.Router();

const {
    getAllSupplier,
    createSupplier,
    getOneSupplier,
    updateSupplier,
    updateManySupplier,
    deleteSupplier,
    deleteManySupplier,
} = require("../controllers/supplierControllers");

const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllSupplier);
router.get("/:id", getOneSupplier);
router.post("/", authenticate, createSupplier);
router.patch("/:id", authenticate, updateSupplier);
router.patch("/",authenticate,updateManySupplier);
router.delete("/:id", authenticate, deleteSupplier);
router.delete("/", authenticate, deleteManySupplier);

module.exports = router;
