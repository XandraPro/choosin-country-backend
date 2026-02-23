const express = require('express');
const router = express.Router();
const { register } = require('../controllers/user.controller');
const { registerValidation } = require('../validations/user.validation');

router.post('/register', registerValidation, validate, register);

module.exports = router;