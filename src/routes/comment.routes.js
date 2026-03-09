const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { createComment } = require('../controllers/comment.controller');

router.post('/', protect, createComment);

module.exports = router;
