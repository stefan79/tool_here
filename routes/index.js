/**
 * Routes index file
 * Combines all route modules and exports them for use in the main application
 */

const express = require('express');
const {geoRoutes} = require('./geocode.routes');
const {healthRoutes} = require('./health.routes');
const {discoverRoutes} = require('./discover.routes');
const {mcpRoutes} = require('./mcp.routes')

const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Apply rate limiting
const limiter = (config, client, server) => rateLimit({
    windowMs: config.RATE_LIMIT.WINDOW_MS,
    max: config.RATE_LIMIT.MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
  });

module.exports = (app, config, client, server) => {
    const router = express.Router();

    // Register all route modules

    app.use('/rest/',express.json());
    app.use('/rest/',cors());
    app.use('/rest/',helmet());
    app.use('/rest/',limiter(config, client, server));


    router.use('/rest/discover', discoverRoutes(config, client, server)); 
    router.use('/rest/geocode', geoRoutes(config, client, server));
    router.use('/rest/health', healthRoutes(config, client, server));
    router.use('/', mcpRoutes(config, client, server));

    return router;
};