const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middlewares/auth");
const {
    getItemsInCart,
    addAnItemToCart,
    updateQuantityOfAnItem,
    deleteAnItemInCart,
    deleteManyItemInCart,
} = require("../controllers/cartControllers");

router.get("/", authenticate, getItemsInCart);
router.post("/item", authenticate, addAnItemToCart);
router.patch("/item/:itemId", authenticate, updateQuantityOfAnItem);
router.delete("/item", authenticate, deleteManyItemInCart);
router.delete("/item/:itemId", authenticate, deleteAnItemInCart);

module.exports = router;
