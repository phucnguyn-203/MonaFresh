const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    getAllFeedback,
    getOneFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    setTourUserIds,
} = require("../controllers/feedbackControllers");

const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", getAllFeedback);
router.get("/:id", getOneFeedback);
router.post("/", authenticate, setTourUserIds, createFeedback);
router.patch("/:id", authenticate, updateFeedback);
router.delete("/:id", authenticate, deleteFeedback);

module.exports = router;
