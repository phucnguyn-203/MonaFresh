const express = require("express");
const router = express.Router();

const {
    getAllFeedback,
    getOneFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbackControllers");

router.get("/", getAllFeedback);
router.get("/:id", getOneFeedback);
router.post("/", createFeedback);
router.patch("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;