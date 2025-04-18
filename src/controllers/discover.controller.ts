/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

import {errorHandler, serializeResponse} from "./util"
import { AppConfig } from '../config';
import { HereApi } from '../clients/here';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Request, Response } from 'express';

export const discover = (config: AppConfig, client: HereApi, server: McpServer) => (req: Request, res: Response) => {
  return client.discover({
    location: req.query.location as string,
    query: req.query.query as string
  }).then(serializeResponse(req, res))
    .catch(errorHandler(req, res))

};
