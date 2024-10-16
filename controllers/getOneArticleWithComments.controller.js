const fetchOneArticleWithComments = require("../models/fetchOneArticleWithComments.model.js");

function getOneArticleWithComments(req, res, next) {
  const { article_id } = req.params;
  fetchOneArticleWithComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getOneArticleWithComments;
