const AppError = require("../utils/AppError");

const handleDuplicateFieldsDB = (err) => {
    const message = `Duplicate field value ${Object.keys(err.keyValue)}. Please use another value`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

const sendErrorPro = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

module.exports = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }

    if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.name = err.name;
        error.message = err.message;
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        sendErrorPro(error, res);
    }
};
