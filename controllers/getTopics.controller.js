const fetchTopics = require("../models/fetchTopics.model.js");

function getTopics(req, res, next) {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

module.exports = getTopics;
