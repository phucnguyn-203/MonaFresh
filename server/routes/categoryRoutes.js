const express = require("express");
const router = express.Router();

const {
    getAllCategory,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
