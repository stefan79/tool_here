import express  from 'express';
import { AppConfig, RateLimitConfig } from './config';
import { HereApi } from './clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { routes } from './routes';

export const buildExpressServer = (appConfig: AppConfig, hereClient: HereApi, server: McpServer) => {
    // Initialize express app
    const app = express();
    const PORT = appConfig.port;
    // Register routes
    app.use('/', routes(app, appConfig, hereClient, server));
    return app 
};
