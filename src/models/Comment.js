const moongoose = require('mongoose');

const commentSchema = new moongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    song: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true, 
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = moongoose.model('Comment', commentSchema);