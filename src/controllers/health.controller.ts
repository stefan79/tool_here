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

export const checkHealth = (config:   AppConfig, client: HereApi, server: McpServer) => (req: Request, res: Response) => {
  console.log("Health Check Completed")
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    });
  };