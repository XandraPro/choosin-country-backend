const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {getSongs, createSong, updateSong, deleteSong} = require("../controllers/song.controller");

router.get("/", auth, getSongs);
router.post("/", auth, createSong);
router.put("/:id", auth, updateSong);
router.delete("/:id", auth, deleteSong);

module.exports = router;