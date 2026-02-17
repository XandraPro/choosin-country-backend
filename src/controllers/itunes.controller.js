const axios = require('axios');

exports.seachSongs = async (req, res) => {
    try {
        const { term } = req.query;
        const response = await axios.get("https://itunes.apple.com/search",
            {
                params: {
                    term,
                    media: "song",
                    limit: 10
                }
            });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching songs.' });
    }
};