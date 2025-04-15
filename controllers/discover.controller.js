/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

const {errorHandler, serializeReponse} = require("./util.js")

exports.discover = (config, client, server) => (req, res) => {
  return client.discover({
    location: req.query.location,
    query: req.query.query
  }).then(serializeReponse(req, res))
    .catch(errorHandler(req, res))

};
