/**
 * Geocoding routes
 * Handles forward and reverse geocoding requests
 */

import express,  { Router } from 'express';
import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { discover } from '../controllers/discover.controller';

export const discoverRoutes = (config: AppConfig, client: HereApi, server: McpServer): Router => {
    const router = express.Router();
    
    // Forward geocoding - convert address to coordinates
    router.get('/', discover(config, client, server));
    return router    
};