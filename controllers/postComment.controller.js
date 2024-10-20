const addCommentToDb = require("../models/addCommentToDb.model.js");

function postComment(req, res, next) {
  const newComment = req.body;

  addCommentToDb(newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = postComment;
