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
    checkInventory,
    updateInventory,
    returnInventory,
} = require("../controllers/productControllers");
const feedbackRouter = require("./feedbackRoutes");

const { authenticate, authorize } = require("../middlewares/auth");
const { USER_ROLES } = require("../utils/Constant");

router.get("/", getAllProduct);
router.get("/similar", getSimilarProducts);
router.post("/check-inventory", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), checkInventory);
router.patch("/update-inventory", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), updateInventory);
router.patch(
    "/return-inventory/:orderId",
    authenticate,
    authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF),
    returnInventory,
);
router.get("/:id", getOneProduct);
router.use("/:productId/feedbacks", feedbackRouter);
router.post("/", authenticate, createProduct);
router.patch("/:id", authenticate, updateProduct);
router.patch("/", authenticate, updateManyProduct);
router.delete("/:id", authenticate, deleteProduct);
router.delete("/", authenticate, deleteManyProduct);

module.exports = router;
