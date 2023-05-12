const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productControllers");
const feedbackRouter = require("./feedbackRoutes");

const { authenticate, authorize } = require("../middlewares/auth");

router.use("/:productId/feedbacks", feedbackRouter);

router.get("/", getAllProduct);
router.get("/:id", getOneProduct);
router.post("/", authenticate, createProduct);
router.patch("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
