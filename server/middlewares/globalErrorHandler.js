module.exports = (err, req, res, next) => {
    res.json({
        status: "error",
        error: err,
    });
};
