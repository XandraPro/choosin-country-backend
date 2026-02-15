const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  artistName : { type: String, required: true },
  personalNote: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);