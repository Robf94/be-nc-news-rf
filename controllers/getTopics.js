const fetchTopics = require("../models/fetchTopics.js");

function getTopics(req, res, next) {
  // console.log(Object.keys(req));
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

module.exports = getTopics;
