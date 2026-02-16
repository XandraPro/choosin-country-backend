const Song = require('../models/Song');

exports.getSongs = async (req, res) => {
    const songs = await Song.find( {user: req.user} );
    res.json(songs);            
}

exports.createSong = async (req, res) => {
    const newSong = await Song.create({...req.body, user: req.user});
    res.json(newSong);
}

exports.updateSong = async (req, res) => {
    const updatedSong = await Song.findOneAndUpdate(
        {_id: req.params.id, user: req.user},
        req.body,
        {new: true}
    );
    res.json(updatedSong);
}

exports.deleteSong = async (req, res) => {
    await Song.findOneAndDelete({_id: req.params.id, user: req.user});
    res.json({message: 'Song deleted'});
}   
    