const express = require("express");
const router = express.Router();
const { USER_ROLES } = require("../utils/Constant");

const {
    getAllOrder,
    getOneOrder,
    getMyOrders,
    getOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderControllers");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllOrder);
router.get("/my-orders", authenticate, authorize(USER_ROLES.CUSTOMER), getMyOrders);
router.get("/user/:userId", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getOrdersByUserId);
router.get("/:id", getOneOrder);
router.post("/", authenticate, authorize(USER_ROLES.CUSTOMER), createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
