require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 