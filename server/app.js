const express = require("express");
const app = express();
const morgan = require("morgan");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

//IMPORT ROUTES
const categoryRouter = require("./routes/categoryRoutes");
const cartRouter = require("./routes/cartRouter");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//BODY PARSER
app.use(express.json({ limit: "50mb" }));

//ROUTER
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/carts", cartRouter);

app.use(globalErrorHandler);
module.exports = app;
