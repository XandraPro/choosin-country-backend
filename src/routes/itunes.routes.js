const express = require('express');
const router = express.Router();
const {searchSongs} = require('../controllers/itunes.controller');

router.get('/search', searchSongs);

module.exports = router;