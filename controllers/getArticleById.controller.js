const fetchArticlesById = require("../models/fetchArticleById.model.js");

function getArticlesById(req, res, next) {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

// Note - article_id refers to :param set in app and test endpoint

module.exports = getArticlesById;
