const express = require("express");
const router = express.Router();
const { USER_ROLES } = require("../utils/Constant");

const {
    getTodayProfit,
    getTotalCustomer,
    getTotalProduct,
    getTotalProductsOutofStock,
    getOrdersStatistic,
    getTopSellingProducts,
    getProfitInMonth,
} = require("../controllers/statisticControllers");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/today-profit", authenticate, authorize(USER_ROLES.ADMIN), getTodayProfit);
router.get("/total-customer", authenticate, authorize(USER_ROLES.ADMIN), getTotalCustomer);
router.get("/total-product", authenticate, authorize(USER_ROLES.ADMIN), getTotalProduct);
router.get("/product-outofstock", authenticate, authorize(USER_ROLES.ADMIN), getTotalProductsOutofStock);
router.get("/orders", authenticate, authorize(USER_ROLES.ADMIN), getOrdersStatistic);
router.get("/top-selling-products", authenticate, authorize(USER_ROLES.ADMIN), getTopSellingProducts);
router.get("/profit-in-month", authenticate, authorize(USER_ROLES.ADMIN), getProfitInMonth);

module.exports = router;
