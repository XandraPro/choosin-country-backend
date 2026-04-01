const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const songRoutes = require('./src/routes/song.routes');
const commentRoutes = require('./src/routes/comment.routes');
const statsRoutes = require('./src/routes/stats.routes');
const eventsRoutes = require("./src/routes/events.routes");

const errorHandler = require('./src/middlewares/error.middleware');
//fixing route weeklyReset
const weeklyReset = require('./src/jobs/weeklyReset');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Country Music API running'
    })
})

weeklyReset();



app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/comments', commentRoutes);   
app.use('/api/stats', statsRoutes); 
app.use("/api/events", eventsRoutes);

app.use(errorHandler);

module.exports = app;