const Song = require('../models/Song');

exports.voteSong = async (songId) => {
    const song = await Song.findById(songId);
    if (!song) {
        throw new Error('Song not found');
    }

    song.savesCount += 1;
    await song.save();
    return song;
};