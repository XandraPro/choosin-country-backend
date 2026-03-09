const User = require('../models/User');
const Song = require('../models/Song');
const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');

exports.getStats = catchAsync(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalSongs = await Song.countDocuments();
    const totalComments = await Comment.countDocuments();

    const totals = await Song.aggregate([
        {
            $group: {
                _id: null,
                totalPlays: { $sum: '$playsCount' },
                totalSaves: { $sum: '$savesCount' },
            },
        },
    ]);

    const topSongs = await Song.aggregate([
        {
            $addFields: {
                score: {
                    $add: [
                        "$playsCount",
                        { $multiply: ['$savesCount', 3] }
                    ],
                },
            },
        },
        { $sort: { score: -1 } },
        { $limit: 1 },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            totalUsers,
            totalSongs,
            totalComments,
            totalPlays: totals[0]?.totalPlays || 0,
            totalSaves: totals[0]?.totalSaves || 0,
            topSongs: topSongs[0] || null,
        },
    });
});