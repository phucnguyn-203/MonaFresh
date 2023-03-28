const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    checkLogin,
    getNewAccessToken,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateMe,
    deleteMe,
    logout,
} = require("../controllers/userControllers");

const { authenticate } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", authenticate, updatePassword);
router.patch("/updateMe", authenticate, updateMe);
router.delete("/deleteMe", authenticate, deleteMe);
router.get("/check-login", checkLogin);
router.get("/get-new-accessToken", getNewAccessToken);
router.get("/logout", logout);
module.exports = router;
