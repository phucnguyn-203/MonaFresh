const express = require("express");
const router = express.Router();

const { getAllOrder, getOneOrder, createOrder, updateOrder, deleteOrder } = require("../controllers/orderControllers");

router.get("/", getAllOrder);
router.get("/:id", getOneOrder);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
