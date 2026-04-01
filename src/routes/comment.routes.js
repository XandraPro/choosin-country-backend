const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  createComment,
  getCommentsBySong,
  updateComment,
} = require("../controllers/comment.controller");

router.post("/", protect, createComment);
router.get("/:songId", getCommentsBySong);
router.patch("/:commentId", protect, updateComment);

module.exports = router;