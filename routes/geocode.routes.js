/**
 * Geocoding routes
 * Handles forward and reverse geocoding requests
 */

const express = require('express');

module.exports.geoRoutes = (config, client, server) => {
    const router = express.Router();
    const geocodeController = require('../controllers/geocode.controller');
    
    // Forward geocoding - convert address to coordinates
    router.get('/', geocodeController.geoCode(config, client, server));
    return router
    
}
