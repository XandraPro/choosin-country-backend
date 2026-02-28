const Song = require('../models/Song');
const catchAsync = require('../utils/catchAsync');

exports.getSongs = catchAsync(async (req, res) => {
    const songs = await Song.find({user: req.user._id});
    res.json(songs);
});

exports.createSong = catchAsync(async (req, res) => {
    const newSong = await Song.create({...req.body, user: req.user._id});
    res.json(newSong);
});

exports.updateSong = catchAsync(async (req, res) => {
    const updatedSong = await Song.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        req.body,
        {new: true}
    );
    res.json(updatedSong);
});

exports.deleteSong = catchAsync(async (req, res) => {
    await Song.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.json({message: 'Song deleted'});
});   
    