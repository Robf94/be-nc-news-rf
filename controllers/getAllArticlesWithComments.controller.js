const fetchAllArticlesWithComments = require("../models/fetchAllArticlesWithComments.model.js");

function getAllArticlesWithComments(req, res, next) {
  fetchAllArticlesWithComments()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getAllArticlesWithComments;
