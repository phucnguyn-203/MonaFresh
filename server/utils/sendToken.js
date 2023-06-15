const sendToken = (res, { name, token, maxAge }) => {
    cookieOptions = {
        httpOnly: true,
        sameSite: "none",
    };

    res.cookie(name, token, { ...cookieOptions, maxAge });
};

module.exports = sendToken;
