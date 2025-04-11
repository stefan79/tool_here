/**
 * MCP Server for HERE.com Integration
 * 
 * This Node.js implementation of a Map Content Provider (MCP) server
 * connects to HERE.com's API for geocoding and geographic searches.
 * This server can be embedded into various AI tools.
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const config = require('./config');
const routes = require('./routes');

// Validate critical configuration
try {
  config.validateConfig();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}

// Initialize express app
const app = express();
const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT.WINDOW_MS,
  max: config.RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Register routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  //console.error('Server error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: config.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`MCP Server running on port ${PORT}`);
  });
}

// Export for testing purposes
module.exports = app;