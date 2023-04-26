const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

//IMPORT ROUTES
const categoryRouter = require("./routes/categoryRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
// const feedbackRouter = require("./routes/feedbackRoutes");
const userRouter = require("./routes/userRoutes");
const addressRouter = require("./routes/addressRoutes");
const uploadFileRouter = require("./routes/uploadFileRoutes");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//COOKIE PARSER
app.use(cookieParser());

//CORS
const whitelist = [process.env.FRONT_END_ADMIN_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

//BODY PARSER
app.use(express.json({ limit: "50mb" }));

//ROUTER
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);
// app.use("/api/v1/feedbacks", feedbackRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/upload", uploadFileRouter);

app.use(globalErrorHandler);
module.exports = app;
