const Comment = require("../models/Comment");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createComment = catchAsync(async (req, res, next) => {
  const { songId, text } = req.body;

  const comment = await Comment.create({
    text,
    song: songId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: comment,
  });
});

exports.getCommentsBySong = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({
    song: req.params.songId,
  }).populate("user", "email");

  res.status(200).json({
    status: "success",
    data: comments,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user._id },
    { text: req.body.text },
    { new: true, runValidators: true }
  );

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: comment,
  });
});