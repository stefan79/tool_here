/**
 * Application Configuration
 * Centralizes configuration values and environment variables
 */

require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes in milliseconds
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  // HERE API configuration
  HERE_API_KEY: process.env.HERE_API_KEY,
  HERE_BASE_URL: 'https://geocode.search.hereapi.com/v1',
  HERE_DISCOVER_URL: 'https://discover.search.hereapi.com/v1',
  HERE_ROUTING_URL: 'https://router.hereapi.com/v8',
  
  // Validate critical config
  validateConfig: () => {
    const missingVars = [];
    
    if (!process.env.HERE_API_KEY) {
      missingVars.push('HERE_API_KEY');
    }
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
};