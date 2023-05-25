const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getItemsInCart = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const cart = await Cart.findOne({ customer: _id });
    if (!cart) {
        return next(new AppError("Không tìm thấy giỏ hàng", 404));
    }
    res.status(200).json({
        status: "success",
        data: cart.items,
    });
});

exports.addAnItemToCart = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ customer: _id });
    if (!cart) {
        return next(new AppError("Không tìm thấy giỏ hàng", 404));
    }
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError("Không tìm thấy sản phẩm", 404));
    }

    const item = {
        product: product._id,
        quantity,
    };
    cart.items.push(item);
    await cart.save();

    const populatedCart = await Cart.findOne({ customer: _id }).populate("items.product");

    res.status(200).json({
        status: "success",
        data: populatedCart.items,
    });
});

exports.updateQuantityOfAnItem = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ customer: _id });
    if (!cart) {
        return next(new AppError("Không tìm thấy giỏ hàng", 404));
    }
    const item = cart.items.find((item) => item._id.toString() === itemId);
    if (!item) {
        return next(new AppError("Sản phẩm không tồn tại trong giỏ hàng", 404));
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({
        status: "success",
        data: cart.items,
    });
});

exports.deleteAnItemInCart = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { itemId } = req.params;
    const cart = await Cart.findOne({ customer: _id });
    if (!cart) {
        return next(new AppError("Không tìm thấy giỏ hàng", 404));
    }
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    res.status(200).json({
        status: "success",
        data: cart.items,
    });
});

exports.deleteManyItemInCart = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { itemIds } = req.body;
    const cart = await Cart.findOne({ customer: _id });

    if (!cart) {
        return next(new AppError("Không tìm thấy giỏ hàng", 404));
    }

    cart.items = cart.items.filter((item) => !itemIds.includes(item._id.toString()));

    await cart.save();

    res.status(200).json({
        status: "success",
        data: cart.items,
    });
});
