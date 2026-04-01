const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  getSongs,
  saveSong,
  getTrendingSongs,
  getRanking,
  incrementPlayCount,
  getMySongs,
  deleteMySong,
  voteSong,
} = require("../controllers/song.controller");

router.get("/", getSongs);
router.get("/trending", getTrendingSongs);
router.get("/ranking", getRanking);
router.get("/my-songs", protect, getMySongs);

router.post("/save", protect, saveSong);
router.post("/:trackId/play", protect, incrementPlayCount);
router.post("/:songId/vote", protect, voteSong);

router.delete("/my-songs/:songId", protect, deleteMySong);


module.exports = router;