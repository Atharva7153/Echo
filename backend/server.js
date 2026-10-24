require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const issuesRoutes = require('./routes/issues');
const aiRoutes = require('./routes/ai');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
app.use(cors());
app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Echo API is running' });
});

// Ping endpoint for monitoring
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Routes
app.use('/api/issues', issuesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => console.error(err));
