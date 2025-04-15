/**
 * Geocoding routes
 * Handles forward and reverse geocoding requests
 */

const express = require('express');

module.exports.discoverRoutes = (config, client, server) => {
    const router = express.Router();
    const discoverController = require('../controllers/discover.controller');
    
    // Forward geocoding - convert address to coordinates
    router.get('/', discoverController.discover(config, client, server));
    return router    
};