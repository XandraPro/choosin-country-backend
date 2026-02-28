const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {getSongs, createSong, updateSong, deleteSong} = require("../controllers/song.controller");

router.get("/", protect, getSongs);
router.post("/", protect, createSong);
router.put("/:id", protect, updateSong);
router.delete("/:id", protect, deleteSong);

module.exports = router;

