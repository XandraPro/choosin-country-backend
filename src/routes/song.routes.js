const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const { createSong} = require("../controllers/song.controller");

router.post("/", protect, createSong);
module.exports = router;

/*
const auth = require("../middlewares/auth.middleware");
const {getSongs, createSong, updateSong, deleteSong} = require("../controllers/song.controller");

router.get("/", auth, getSongs);
router.post("/", auth, createSong);
router.put("/:id", auth, updateSong);
router.delete("/:id", auth, deleteSong);*/

