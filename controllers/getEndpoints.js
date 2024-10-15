const fetchEndpoints = require("../models/fetchEndpoints.js");

function getEndpoints(req, res, next) {
  fetchEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints: endpoints });
  });
}

module.exports = getEndpoints;
