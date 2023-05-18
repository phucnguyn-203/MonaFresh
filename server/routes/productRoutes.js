const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    getOneProduct,
    getSimilarProducts,
    updateProduct,
    updateManyProduct,
    deleteProduct,
    deleteManyProduct,
} = require("../controllers/productControllers");
const feedbackRouter = require("./feedbackRoutes");

const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllProduct);
router.get("/similar", getSimilarProducts);
router.get("/:id", getOneProduct);
router.use("/:productId/feedbacks", feedbackRouter);
router.post("/", authenticate, createProduct);
router.patch("/:id", authenticate, updateProduct);
router.patch("/", authenticate, updateManyProduct);
router.delete("/:id", authenticate, deleteProduct);
router.delete("/", authenticate, deleteManyProduct);

module.exports = router;
