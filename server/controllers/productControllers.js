const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req, res) => {
    const features = new ApiFeatures(Product, req.query).filter().sort().limitFields();
    const { query, totalPages, currentPage } = await features.paginate();
    const products = await query;
    res.status(200).json({
        status: "success",
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: products.length,
        data: products,
    });
});

exports.getSimilarProducts = catchAsync(async (req, res) => {
    const features = new ApiFeatures(
        Product.find({
            $and: [{ category: req.query.category }, { _id: { $ne: req.query._id } }],
        }),
        req.query,
    );
    const products = await features.query;
    res.status(200).json({
        status: "success",
        results: products.length,
        data: products,
    });
});

exports.getOneProduct = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: product,
    });
});

exports.createProduct = catchAsync(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        status: "success",
        data: product,
    });
});
exports.updateProduct = catchAsync(async (req, res) => {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: product,
    });
});
exports.updateManyProduct = catchAsync(async (req, res) => {
    await Product.updateMany(
        { _id: { $in: req.body.data.productIds } },
        { $set: { isActive: req.body.data.isActive } },
        { multi: true },
    );
    res.status(200).json({
        status: "success",
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteManyProduct = catchAsync(async (req, res) => {
    await Product.deleteMany({ _id: { $in: req.body.productIds } });
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.checkInventory = catchAsync(async (req, res, next) => {
    const { orderDetail } = req.body;

    // Lấy danh sách ID sản phẩm từ orderDetail
    const productIds = orderDetail.map((item) => item.product);

    // Truy vấn cơ sở dữ liệu để lấy thông tin sản phẩm
    const products = await Product.find({ _id: { $in: productIds } });

    // Kiểm tra số lượng sản phẩm
    const errors = [];

    for (const item of orderDetail) {
        const product = products.find((p) => p._id.toString() === item.product);

        if (!product) {
            errors.push(`Product with ID ${item.product} does not exist.`);
            continue;
        }

        if (item.quantity > product.quantity) {
            errors.push(`Insufficient inventory for product ${product.name}.`);
        }
    }

    if (errors.length > 0) {
        return next(
            new AppError(
                "Số lượng các sản phẩm trong đơn hàng nhiều hơn số sản phẩm trong kho hoặc sản phẩm đã bị xoá",
                400,
            ),
        );
    }

    res.status(200).json({
        status: "success",
    });
});

exports.updateInventory = catchAsync(async (req, res) => {
    const { orderDetail } = req.body;

    const updatedProducts = [];

    for (const item of orderDetail) {
        // Cập nhật số lượng sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(
            item.product,
            { $inc: { quantity: -item.quantity } },
            { new: true },
        );

        updatedProducts.push(updatedProduct);
    }

    // Cập nhật số lượng thành công và trả về thông tin sản phẩm đã được cập nhật
    res.status(200).json({
        status: "success",
    });
});

exports.returnInventory = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("orderDetail.product");

    if (!order) {
        return next(new AppError("Không tìm thấy đơn hàng", 404));
    }

    for (const item of order.orderDetail) {
        const productId = item.product._id;
        const quantityReturned = item.quantity;

        await Product.findByIdAndUpdate(productId, { $inc: { quantity: quantityReturned } }, { new: true });
    }
    order.isReturn = true;
    await order.save();

    return res.json({ message: "Quantity returned to inventory successfully." });
});
