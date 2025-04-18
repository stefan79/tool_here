/**
 * Routes index file
 * Combines all route modules and exports them for use in the main application
 */

import express, { Express, Router } from 'express';
import { geocodeRoutes } from './geocode.routes';
import { healthRoutes } from './health.routes';
import { discoverRoutes } from './discover.routes';
import { mcpRoutes } from './mcp.routes';
import { AppConfig, RateLimitConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Apply rate limiting
const limiter = (config: RateLimitConfig, _client: HereApi, _server: McpServer) => rateLimit({
    windowMs: config.windowMs,
    max: config.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
  });

export const routes = async (app: Express, appConfig: AppConfig, _client: HereApi, _server: McpServer): Promise<Router> => {
    const router = Router();

    // Register all route modules

    app.use('/rest/',express.json());
    app.use('/rest/',cors());
    app.use('/rest/',helmet());
    app.use('/rest/',limiter(appConfig.rateLimit, _client, _server));


    router.use('/rest/discover', discoverRoutes(appConfig, _client, _server)); 
    router.use('/rest/geocode', geocodeRoutes(appConfig, _client, _server));
    router.use('/rest/health', healthRoutes(appConfig, _client, _server));
    router.use('/', await mcpRoutes(appConfig, _client, _server));

    return router;
};