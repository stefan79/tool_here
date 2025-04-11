/**
 * Routes index file
 * Combines all route modules and exports them for use in the main application
 */

const express = require('express');
const geocodeRoutes = require('./geocode.routes');
const healthRoutes = require('./health.routes');
const discoverRoutes = require('./discover.routes');

const router = express.Router();

// Register all route modules
router.use('/discover', discoverRoutes); 
router.use('/geocode', geocodeRoutes);
router.use('/health', healthRoutes);

module.exports = router;