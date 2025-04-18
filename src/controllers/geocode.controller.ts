/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Request, Response } from 'express';
import { errorHandler, serializeResponse } from './util'

export const geoCode = (config: AppConfig, client: HereApi, _server: McpServer) => (req: Request, res: Response) => {
  return client.geoCode(req.query.query as string)
    .then(serializeResponse(req, res))
    .catch(errorHandler(req, res));
};
