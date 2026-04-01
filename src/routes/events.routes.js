const express = require("express");
const router = express.Router();
const { getCountryEvents } = require("../controllers/events.controller");

router.get("/country", getCountryEvents);

module.exports = router;