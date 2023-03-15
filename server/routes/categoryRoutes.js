const express = require("express");
const router = express.Router();

const {
    getOneCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryControllers");

const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/", authenticate, createCategory);
router.patch("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

module.exports = router;
