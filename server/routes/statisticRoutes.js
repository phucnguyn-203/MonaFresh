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
    getExportExcel,
} = require("../controllers/statisticControllers");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/today-profit", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getTodayProfit);
router.get("/total-customer", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getTotalCustomer);
router.get("/total-product", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getTotalProduct);
router.get(
    "/product-outofstock",
    authenticate,
    authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF),
    getTotalProductsOutofStock,
);
router.get("/orders", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getOrdersStatistic);
router.get("/top-selling-products", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getTopSellingProducts);
router.get("/profit-in-month", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getProfitInMonth);
router.get("/export-excel", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getExportExcel);

module.exports = router;
