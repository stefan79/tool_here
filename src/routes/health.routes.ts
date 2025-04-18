/**
 * Health check routes
 * Provides endpoints for monitoring server health
 */

import express, { Router } from 'express';
import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { checkHealth } from '../controllers/health.controller';

export const healthRoutes = (config: AppConfig, client: HereApi, server: McpServer): Router => {
    const router = express.Router();
    
    // Health check endpoint
    router.get('/', checkHealth(config, client, server));
    return router
}