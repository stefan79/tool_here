import express  from 'express';
import { AppConfig } from './config';
import { HereApi } from './clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { routes } from './routes';

export const buildExpressServer = async (appConfig: AppConfig, hereClient: HereApi, server: McpServer) => {
    // Initialize express app
    const app = express();
    const _PORT = appConfig.port;
    // Register routes
    app.use('/', await routes(app, appConfig, hereClient, server));
    return app 
};
