const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    trackId: {
      type: Number,
      required: true,
      unique: true
    },
    songTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    artwork: String,
    previewUrl: String,
    savesCount: {
      type: Number,
      default: 0
    },
    playsCount: {
      type: Number,
      default: 0
    },
    weeklyScore: {
      type: Number,
      default: 0,
      index: true
    },
    lastPlayedAt: Date,    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);