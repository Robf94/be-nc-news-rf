const addCommentToDb = require("../models/addCommentToDb.model.js");

function postComment(req, res, next) {
  const { body, author } = req.body;
  const { article_id } = req.params;

  if (!body || !author) {
    return res.status(400).send({ msg: "Missing required fields" });
  }

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Invalid article_id" });
  }

  const votes = 0;
  const created_at = new Date();

  const newComment = { body, author, article_id, votes, created_at };

  addCommentToDb(newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = postComment;
