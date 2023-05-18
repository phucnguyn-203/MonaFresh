const express = require("express");
const router = express.Router();

const {
    getOneCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    updateManyCategory,
    deleteCategory,
    deleteManyCategory,
} = require("../controllers/categoryControllers");

const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/", authenticate, createCategory);
router.patch("/:id", authenticate, updateCategory);
router.patch("/", authenticate, updateManyCategory)
router.delete("/:id", authenticate, deleteCategory);
router.delete("/", authenticate, deleteManyCategory);

module.exports = router;
