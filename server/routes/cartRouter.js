const express = require("express");
const router = express.Router();

const { getAllCart, getOneCart, createCart, deleteCart, updateCart } = require("../controllers/cartControllers");

router.get("/", getAllCart);
router.get("/:id", getOneCart);
router.post("/", createCart);
router.delete("/:id", deleteCart);
router.patch("/:id", updateCart);

module.exports = router;
