/**
 * Geocode Controller
 * Handles geocoding and reverse geocoding operations
 */

const config = require('../config');
const hereClient = require('../clients/here.js')(config)
const {errorHandler, serializeReponse} = require("./util.js")

exports.geocode = (req, res) => {
  return hereClient.geoCode(req.query.query)
    .then(serializeReponse(req, res))
    .catch(errorHandler(req, res));
};
