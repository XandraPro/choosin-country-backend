const song = require('../models/song.model');

exports.getSongs = async (req, res) => {
    const songs = await song.find( {user: req.user} );
    res.json(songs);            
}

exports.createSong = async (req, res) => {
    const newSong = await song.create({...req.body, user: req.user});
    res.json(newSong);
}

exports.updateSong = async (req, res) => {
    const updatedSong = await song.findOneAndUpdate(
        {_id: req.params.id, user: req.user},
        req.body,
        {new: true}
    );
    res.json(updatedSong);
}

exports.deleteSong = async (req, res) => {
    await song.findOneAndDelete({_id: req.params.id, user: req.user});
    res.json({message: 'Song deleted'});
}   
    