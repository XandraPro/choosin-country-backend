const Song = require("../models/Song");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Comment = require("../models/Comment");

exports.getSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find();

  res.status(200).json({
    status: "success",
    results: songs.length,
    data: songs,
  });
});

exports.saveSong = catchAsync(async (req, res, next) => {
  const { trackId, songTitle, artist, artwork, previewUrl } = req.body;

  let song = await Song.findOne({ trackId });

  if (!song) {
    song = await Song.create({
      trackId,
      songTitle,
      artist,
      artwork,
      previewUrl,
    });
  }

  song.savesCount += 1;
  song.weeklyScore += 1;
  await song.save();

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { savedSongs: song._id },
  });

  res.status(200).json({
    status: "success",
    data: song,
  });
});

// Increments play count and updates last played timestamp
exports.incrementPlayCount = catchAsync(async (req, res, next) => {
  const song = await Song.findOne({ trackId: req.params.trackId });

  if (!song) {
    return next(new AppError("Song not found", 404));
  }

  song.playsCount += 1;
  song.weeklyScore += 1;
  song.lastPlayedAt = new Date();
  await song.save();

  res.status(200).json({
    status: "success",
    data: song,
  });
});

// Retrieves trending songs based on weekly score
exports.getTrendingSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find().sort({ weeklyScore: -1 }).limit(10);

  res.status(200).json({
    status: "success",
    data: songs,
  });
});

exports.getRanking = catchAsync(async (req, res, next) => {
  const songs = await Song.aggregate([
    {
      $addFields: {
        score: {
          $add: ["$playsCount", { $multiply: ["$savesCount", 2] }],
        },
      },
    },
    { $sort: { score: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({
    status: "success",
    data: songs,
  });
});

exports.getMySongs = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("savedSongs");

  res.status(200).json({
    status: "success",
    data: user.savedSongs,
  });
});

exports.deleteMySong = catchAsync(async (req, res, next) => {
  const { songId } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { savedSongs: songId },
  });

  await Comment.deleteMany({
    song: songId,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    message: "Song removed from saved songs and your comments were deleted",
  });
});;

exports.voteSong = catchAsync(async (req, res, next) => {
  const song = await Song.findById(req.params.songId);

  if (!song) {
    return next(new AppError("Song not found", 404));
  }

  song.savesCount += 1;
  song.weeklyScore += 1;
  await song.save();

  res.status(200).json({
    status: "success",
    data: song,
  });
});