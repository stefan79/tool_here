const { McpServer, ResourceTemplate } = require ("@modelcontextprotocol/sdk/server/mcp.js");

const { z } = require ("zod");
  
const mapToolResponse = (location, query) => (data) => {
    console.log("Data", data)
    const result =  {
      content: data.map((item) => ({
        type: 'text',
        text: `${item.title}: ${item.address}`
    }))
    }
    console.log("Response", result)
    return Promise.resolve(result)
};

const mapResonse = (location, query) => (data) => {
  console.log("Data", data)
  const result =  {content: data.map((item) => ({
      type: 'text',
      text: item.title
  }))
  }
  console.log("Response", result)
  return Promise.resolve(result)
};


module.exports = (config, hereClient) => {
    // Create an MCP server
    const server = new McpServer({
        name: "Demo",
        version: "1.0.0"
      });

    server.tool("discover",
      {
        location: z.string(),
        query: z.string()
      },
      ({location, query}) => {
        return hereClient.discover({location, query}).then(mapToolResponse(location, query))
      }      
    );

    server.resource(
      "discover",
      new ResourceTemplate("discovery://{location}/{query}", { list: undefined }),
      (uri, { location, query }) => {
        return hereClient.discover({
          query: query,
          location: location
        }).then(mapResponse(location, query))
      }
    );



      server.resource(
        "greeting",
        new ResourceTemplate("greeting://{name}", { list: undefined }),
        async (uri, { name }) => ({
          contents: [{
            uri: uri.href,
            text: `Hello, ${name}!`
          }]
        })
      );

    return server;
}
  