import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { AppConfig } from './config';
import { HereApi, GeoCodeItem} from './clients/here';
import { name, version } from '../package.json';

const mapToolResponse = (data: GeoCodeItem[]) => {
    console.log("Data", data)
    const result =  {
      content: data.map((item) => ({
        type: 'text' as const,
        text: `${item.title}: ${item.address}`
    }))
    }
    console.log("Response", result)
    return result
};

export const createMCPServer = (config: AppConfig, hereClient: HereApi): McpServer => {
    // Create an MCP server
    const server = new McpServer({
        name,
        version
      });

    server.tool("discover",
      {
        location: z.string(),
        query: z.string()
      },
      async (args, _extra) => {
        const result = await hereClient.discover({
          location: args.location,
          query: args.query
        });
        return mapToolResponse(result);
      }      
    );

    return server;
}