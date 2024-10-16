const fetchEndpoints = require("../models/fetchEndpoints.model.js");

function getEndpoints(req, res, next) {
  fetchEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints: endpoints });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getEndpoints;
