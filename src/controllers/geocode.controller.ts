/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

const {errorHandler, serializeReponse} = require("./util.js")

exports.geoCode = (config, client, server) => (req, res) => {
  return client.geoCode(req.query.query)
    .then(serializeReponse(req, res))
    .catch(errorHandler(req, res));
};
