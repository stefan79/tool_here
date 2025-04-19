import { config, validateConfig } from './config';
import {createMCPServer} from './mcp';
import { createHereClient } from './clients/here';
import { buildExpressServer } from './express';
import { logger } from './utils/logger';

// Validate critical configuration
try {
  validateConfig();
} catch (error: unknown) {
  logger.error('Application error', { error: error instanceof Error ? error.message : String(error) });
  process.exit(1);
}

const hereClient = createHereClient(config, logger);
const mcpServer = createMCPServer(config, hereClient);

async function startServer() {
  try {
    const app = await buildExpressServer(config, hereClient, mcpServer);

    // Start the server
    if (process.env.NODE_ENV !== 'test') {
      app.listen(config.port, () => {
        logger.info('MCP Server started', { port: app.get('port') });
      });
    }
  } catch (error) {
    logger.error('Failed to start server', { error: error instanceof Error ? error.message : String(error) });
    process.exit(1);
  }
}

startServer();
