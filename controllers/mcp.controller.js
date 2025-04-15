const { SSEServerTransport } = require ("@modelcontextprotocol/sdk/server/sse.js");

const transports = {}; // Store active SSE transports by session ID

module.exports.routeSse = (config, client, server) =>  (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;

  // Clean up on connection close
  res.on("close", () => {
    delete transports[transport.sessionId];
  });

  return server.connect(transport);
}

module.exports.routeMessage = (config, client, server) =>  (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports[sessionId];

  console.log('Is req readable?', req.readable);
  if (transport) {
    return transport.handlePostMessage(req, res); // Forward messages to the server
  } else {
    res.status(400).send("No active session found for this sessionId");
  }
}