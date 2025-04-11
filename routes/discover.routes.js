/**
 * Geocoding routes
 * Handles forward and reverse geocoding requests
 */

const express = require('express');
const router = express.Router();
const discoverController = require('../controllers/discover.controller');

// Forward geocoding - convert address to coordinates
router.get('/', discoverController.discover);

module.exports = router;