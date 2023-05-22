const express = require("express");
const router = express.Router();
const { USER_ROLES } = require("../utils/Constant");

const {
    getAllOrder,
    getOneOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getMyOrders,
} = require("../controllers/orderControllers");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllOrder);
router.get("/my-orders", authenticate, getMyOrders);
router.get("/:id", getOneOrder);
router.post("/", authenticate, authorize(USER_ROLES.CUSTOMER), createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
