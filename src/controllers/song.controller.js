const Song = require('../models/Song');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getSongs = catchAsync(async (req, res, next) => {
    const songs = await Song.find();

    res.status(200).json({
        status: 'success',
        results: songs.length,
        data: songs,
    });
});

exports.createSong = catchAsync(async (req, res, next) => {
    const newSong = await Song.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newSong,
    });
});

exports.updateSong = catchAsync(async (req, res, next) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!song) {
        return next(new AppError('Song not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: song,
    });
});

exports.deleteSong = catchAsync(async (req, res, next) => {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
        return next(new AppError('Song not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.saveSong = catchAsync(async (req, res, next) => {
    const { trackId, songTitle, artist, artwork, previewUrl } = req.body;

    let song = await Song.findOne({ trackId });

    if (!song) {
        song = await Song.create({ trackId, songTitle, artist, artwork, previewUrl });
    }

    song.savesCount += 1;
    song.weeklyScore += 1;
    await song.save();

    await User.findByIdAndUpdate(req.user._id, { $addToSet: { savedSongs: song._id } });

    res.status(200).json({
        status: 'success',
        data: song,
    });
});

exports.incrementPlayCount = catchAsync(async (req, res, next) => {
    const song = await Song.findOne({ trackId: req.params.trackId });

    if (!song) {
        return next(new AppError('Song not found', 404));
    }

    song.playsCount += 1;
    song.weeklyScore += 1;
    song.lastPlayedAt = new Date();
    await song.save();

    res.status(200).json({
        status: 'success',
        data: song,
    });
});

exports.getTopSavedSongs = catchAsync(async (req, res, next) => {
    const songs = await Song.find().sort({ savesCount: -1 }).limit(10);

    res.status(200).json({
        status: 'success',
        results: songs.length,
        data: songs,
    });
});

exports.getTopPlayedSongs = catchAsync(async (req, res, next) => {
    const songs = await Song.find().sort({ playsCount: -1 }).limit(10);

    res.status(200).json({
        status: 'success',
        results: songs.length,
        data: songs,
    });
});

exports.getTrendingSongs = catchAsync(async (req, res, next) => {
    const songs = await Song.find().sort({ weeklyScore: -1 }).limit(10);

    res.status(200).json({
        status: 'success',
        results: songs.length,
        data: songs,
    });
});

exports.getRanking = catchAsync(async (req, res, next) => {
    const songs = await Song.aggregate([
        {
            $addFields: {
                score: {
                    $add: [
                        "playsCount",
                        { $multiply: ["savesCount", 2] },
                    ],
                },
            },
        },
        { $sort: { score: -1 } },
        { $limit: 10 },
    ]);

    res.status(200).json({
        status: 'success',
        data: songs,
    });
});
