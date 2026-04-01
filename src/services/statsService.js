const Song = require("../models/Song");

exports.getGlobalStats = async () => {
  const totalSongs = await Song.countDocuments();

  const totalPlays = await Song.aggregate([
    { $group: { _id: null, total: { $sum: "$playsCount" } } },
  ]);

  const totalSaves = await Song.aggregate([
    { $group: { _id: null, total: { $sum: "$savesCount" } } },
  ]);

  return {
    totalSongs,
    totalPlays: totalPlays[0]?.total || 0,
    totalSaves: totalSaves[0]?.total || 0,
  };
};