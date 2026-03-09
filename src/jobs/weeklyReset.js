const cron = require('node-cron');
const { resetWeeklyVotes } = require('../services/voteService');

const weeklyResetJob = () => {
    cron.schedule('0 0 * * 0', async () => {
        console.log('Resetting weekly score...');

        await Song.updateMany({}, { weeklyScore: 0 });

        console.log('Weekly score reset complete.');
    });
};

module.exports = weeklyResetJob;    