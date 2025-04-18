import { config, validateConfig } from './config';
import {createMCPServer} from './mcp';
import { createHereClient } from './clients/here.js';
import { buildExpressServer } from './express';

// Validate critical configuration
try {
  validateConfig();
} catch (error: any) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}

const hereClient = createHereClient(config);
const mcpServer = createMCPServer(config, hereClient);
const app = buildExpressServer(config, hereClient, mcpServer);

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`MCP Server running on port ${config.port}`);
  });
}
