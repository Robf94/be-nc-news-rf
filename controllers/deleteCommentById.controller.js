const removeCommentFromDb = require("../models/removeCommentFromDb.model.js");

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;

  if (isNaN(Number(comment_id))) {
    return res.status(400).send({ msg: "Bad request" });
  }
  removeCommentFromDb(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = deleteCommentById;
