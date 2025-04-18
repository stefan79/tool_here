/**
 * Health Controller
 * Provides health check functionality
 */

/**
 * Health check endpoint
 * GET /health
 */
import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const checkHealth = (_config: AppConfig, _client: HereApi, _server: McpServer) => (req: Request, res: Response) => {
  logger.debug('Health check completed');
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    });
  };