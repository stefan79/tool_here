/**
 * Health Controller
 * Provides health check functionality
 */

/**
 * Health check endpoint
 * GET /health
 */
module.exports.checkHealth = (config, client, server) => (req, res) => {
  console.log("Health Check Completed")
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    });
  };