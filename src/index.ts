import { config, validateConfig } from './config';
import {createMCPServer} from './mcp';
import { createHereClient } from './clients/here';
import { buildExpressServer } from './express';

// Validate critical configuration
try {
  validateConfig();
} catch (error: unknown) {
  console.error(`ERROR: ${error}`);
  process.exit(1);
}

const hereClient = createHereClient(config);
const mcpServer = createMCPServer(config, hereClient);

async function startServer() {
  try {
    const app = await buildExpressServer(config, hereClient, mcpServer);

    // Start the server
    if (process.env.NODE_ENV !== 'test') {
      app.listen(config.port, () => {
        console.log(`MCP Server running on port ${config.port}`);
      });
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
