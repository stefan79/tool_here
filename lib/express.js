
const express = require('express');
const config = require('./config');
const routes = require('../routes');


// Error handling middleware
/*
app.use((err, req, res) => {
  console.error('Server error:', err.message);
  if(res.status){
    res.status(500).json({
      error: 'Internal server error',
      message: config.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
    });
  }
});
*/

module.exports = (config, hereClient, server) => {
    // Initialize express app
    const app = express();
    const PORT = config.PORT;

    // Register routes
    app.use('/', routes(app, config, hereClient, server));

    return app
    
};
