/**
 * Health check routes
 * Provides endpoints for monitoring server health
 */

import express, { Router } from 'express';
import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const mcpRoutes = async (config: AppConfig, client: HereApi, server: McpServer): Promise<Router> => {
    const router = express.Router();
    const {routeSse, routeMessage} = await import('../controllers/mcp.controller');
    
    // Health check endpoint
    router.get('/sse', routeSse(config, client, server));
    router.post('/messages', routeMessage(config, client, server));
    return router    
};

