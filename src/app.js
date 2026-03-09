const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const commentRoutes = require('./routes/comment.routes');
const statsRoutes = require('./routes/stats.routes');

const errorHandler = require('./middlewares/error.middleware');

const weeklyReset = require('./jobs/weeklyReset');

const app = express();

app.use(cors());
app.use(express.json());

weeklyReset();

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/comments', commentRoutes);   
app.use('/api/stats', require('./routes/stats.routes')); 

app.use(errorHandler);

module.exports = app;