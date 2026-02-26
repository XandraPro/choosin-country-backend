const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// show conection to the server
app.get("/", (req, res) => {
    res.send("Welcome to the Choosin' Country API!");
});

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/songs", require("./src/routes/song.routes"));
app.use("/api/itunes", require("./src/routes/itunes.routes"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

// Global error handling middleware
const errorHandler = require("./src/middlewares/error.middleware");
app.use(errorHandler);