/**
 * Geocoding routes
 * Handles forward and reverse geocoding requests
 */

const express = require('express');
const router = express.Router();
const geocodeController = require('../controllers/geocode.controller');

// Forward geocoding - convert address to coordinates
router.get('/', geocodeController.geocode);

module.exports = router;