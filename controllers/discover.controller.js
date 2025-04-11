/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

const config = require('../config.js');
const hereClient = require('../clients/here.js')(config)
const {errorHandler, serializeReponse} = require("./util.js")

exports.discover = (req, res) => {
  return hereClient.discover({
    location: req.query.location,
    query: req.query.query
  }).then(serializeReponse(req, res))
    .catch(errorHandler(req, res))

};
