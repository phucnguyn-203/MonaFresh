const express = require("express");
const router = express.Router();

const { getAllNotifications, updateNotification } = require("../controllers/notificationControllers");
const { authenticate, authorize } = require("../middlewares/auth");
const { USER_ROLES } = require("../utils/Constant");

router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), getAllNotifications);
router.patch("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.STAFF), updateNotification);
module.exports = router;
