const updateArticle = require("../models/updateArticle.model.js");

function patchArticle(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  console.log(req.body);
  updateArticle(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = patchArticle;
