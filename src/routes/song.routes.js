const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {getSongs, createSong, updateSong, deleteSong, getTrendingSongs, getRanking} = require("../controllers/song.controller");

router.get("/", protect, getSongs);
router.post("/", protect, createSong);
router.put("/:id", protect, updateSong);
router.delete("/:id", protect, deleteSong);
router.get("/trending", protect, getTrendingSongs);
router.get("/ranking", protect, getRanking);

module.exports = router;

