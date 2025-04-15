/**
 * Health check routes
 * Provides endpoints for monitoring server health
 */

const express = require('express');

module.exports.mcpRoutes = (config, client, server) => {
    const router = express.Router();
    const {routeSse, routeMessage} = require('../controllers/mcp.controller');
    
    // Health check endpoint
    router.get('/sse', routeSse(config, client, server));
    router.post('/messages', routeMessage(config, client, server));
    return router    
};

