const sendToken = (res, { name, token, maxAge }) => {
    cookieOptions = {
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
        cookieOptions.domain = ".vercel.app";
    }

    res.cookie(name, token, { ...cookieOptions, maxAge });
};

module.exports = sendToken;
