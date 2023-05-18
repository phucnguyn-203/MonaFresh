const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    checkLogin,
    getNewAccessToken,
    forgotPassword,
    resetPassword,
    getStatusResetPasswordToken,
    updatePassword,
    updateMe,
    deleteMe,
    logout,
} = require("../controllers/userControllers");
const { createStaff, getAllStaff, updateStaff, getOneStaff } = require("../controllers/staffControllers");

const { authenticate } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.get("/resetPassword/:token", getStatusResetPasswordToken);
router.patch("/updatePassword", authenticate, updatePassword);
router.patch("/updateMe", authenticate, updateMe);
router.delete("/deleteMe", authenticate, deleteMe);
router.get("/check-login", checkLogin);
router.get("/get-new-accessToken", getNewAccessToken);
router.get("/logout", logout);

router.post("/register-staff", authenticate, createStaff);
router.get("/", getAllStaff);
router.get("/:id", getOneStaff);
router.patch("/:id", authenticate, updateStaff);

module.exports = router;
