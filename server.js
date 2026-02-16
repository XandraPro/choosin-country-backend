require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/songs", require("./src/routes/song.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));