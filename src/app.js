const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require('./routes/user.routes');
const songRoutes = require('./routes/song.routes');
const commentRoutes = require('./routes/comment.routes');
const weeklyReset = require('./utils/weeklyReset');

const app = express();

app.use(cors());
app.use(express.json());

weeklyReset();

app.use('/api/users', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/stats', require('./routes/stats.routes'));  

app.use(errorHandler);

module.exports = app;