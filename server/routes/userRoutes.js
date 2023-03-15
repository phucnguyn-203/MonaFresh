const express = require("express");
const router = express.Router();

const { signup, login, checkLogin, getNewAccessToken, logout } = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-login", checkLogin);
router.get("/get-new-accessToken", getNewAccessToken);
router.get("/logout", logout);
module.exports = router;
