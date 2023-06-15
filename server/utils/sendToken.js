const sendToken = (res, { name, token, maxAge }) => {
    cookieOptions = {
        httpOnly: true,
        sameSite: "none",
    };
    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }

    res.cookie(name, token, { ...cookieOptions, maxAge });
};

module.exports = sendToken;
