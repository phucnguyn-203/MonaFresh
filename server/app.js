const express = require("express");
const app = express();
const morgan = require("morgan");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

//IMPORT ROUTES
const categoryRouter = require("./routes/categoryRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//BODY PARSER
app.use(express.json({ limit: "50mb" }));

//ROUTER
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/inventorys", inventoryRouter);

app.use(globalErrorHandler);
module.exports = app;
