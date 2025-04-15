
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const config = require('./lib/config.js');
const routes = require('./routes');
const mcp = require('./lib/mcp.js');

// Validate critical configuration
try {
  config.validateConfig();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}

const hereClient = require('./clients/here.js')(config)
const server = mcp(config, hereClient)
const app = require('./lib/express.js')(config, hereClient, server)

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`MCP Server running on port ${config.PORT}`);
  });
}
