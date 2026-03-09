const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res) => {
    const { songId, content } = req.body;
    const comment = await Comment.create({
        user: req.user._id,
        song: songId,
        text: content,
    });
    res.status(201).json({
        status: 'success',
        data: {
            comment
        }
    });
});