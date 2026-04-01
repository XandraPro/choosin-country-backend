const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true, 
    },
    text: {
        type: String,
        required: [true, "Comment cannot be empty"],
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);