const db = require("../db/connection.js");

function fetchArticlesById(article_id_model_arg) {
  return db
    .query(
      `SELECT * FROM articles
      WHERE article_id = $1`,
      [article_id_model_arg]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      return err;
    });
}

// Note - article_id_model_arg can be named anything but I have named it in such a way that I can understand that it does not need to match endpoint :param
// Returning rows[0] gives us the first object to test against

module.exports = fetchArticlesById;
