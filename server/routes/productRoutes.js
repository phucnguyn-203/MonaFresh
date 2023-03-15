const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productControllers");

router.get("/", getAllProduct);
router.get("/:id", getOneProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
