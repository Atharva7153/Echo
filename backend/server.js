const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Echo Civic API',
    status: 'online',
    ping: '/api/ping',
    health: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// Ping endpoint for uptime monitoring (available at /ping and /api/ping)
const handlePing = (req, res) => {
  res.status(200).json({
    message: 'pong',
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
};

app.get('/ping', handlePing);
app.get('/api/ping', handlePing);

// Health check endpoint (available at /health and /api/health)
const handleHealth = (req, res) => {
  const dbStates = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const dbStatus = dbStates[mongoose.connection.readyState] || 'unknown';
  res.status(200).json({
    status: 'OK',
    message: 'Echo API is running',
    database: dbStatus,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
};

app.get('/health', handleHealth);
app.get('/api/health', handleHealth);

// Application routes
app.use('/api/issues', issuesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Error handling middleware (placed after routes)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Start listening immediately so uptime monitoring & health checks respond
const server = app.listen(PORT, () => {
  console.log(`Echo backend server running on port ${PORT}`);
});

// Connect to MongoDB
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
    });
} else {
  console.warn('Warning: MONGODB_URI is not set. Database features will be unavailable.');
}

module.exports = app;
