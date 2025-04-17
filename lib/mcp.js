const { McpServer, ResourceTemplate } = require ("@modelcontextprotocol/sdk/server/mcp.js");
  
const mapResponse = (location, query) => (data) => {
    console.log("Data", data)
    const result =  {contents: data.map((item) => ({
        uri: `discovery://${location}/${query}/${item.title}`,
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
  