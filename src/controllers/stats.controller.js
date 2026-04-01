const Song = require("../models/Song");
const catchAsync = require("../utils/catchAsync");

// GLOBAL STATS
exports.getStats = catchAsync(async (req, res, next) => {

 const totalSongs = await Song.countDocuments();

 const totalPlays = await Song.aggregate([
   {
     $group: {
       _id: null,
       total: { $sum: "$playsCount" },
     },
   },
 ]);

 const totalSaves = await Song.aggregate([
   {
     $group: {
       _id: null,
       total: { $sum: "$savesCount" },
     },
   },
 ]);

 res.status(200).json({
   status: "success",
   data: {
     totalSongs,
     totalPlays: totalPlays[0]?.total || 0,
     totalSaves: totalSaves[0]?.total || 0,
   },
 });
});
