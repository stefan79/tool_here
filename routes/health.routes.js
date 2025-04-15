/**
 * Health check routes
 * Provides endpoints for monitoring server health
 */

const express = require('express');

module.exports.healthRoutes = (config, client, server) => {
    const router = express.Router();
    const {checkHealth} = require('../controllers/health.controller');
    
    // Health check endpoint
    router.get('/', checkHealth(config, client, server));
    return router
}