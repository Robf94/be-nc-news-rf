const fetchTopics = require("../models/fetchTopics.js");

function getTopics(req, res, next) {
  // console.log(Object.keys(req));
  fetchTopics().then((topics) => {
    // console.log(topics);
    res.status(200).send({ topics });
  });
}

module.exports = getTopics;
