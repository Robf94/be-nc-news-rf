const db = require("../db/connection.js");

function fetchArticlesById(article_id_model_arg) {
  return db
    .query(
      `SELECT * FROM articles
      WHERE article_id = $1`,
      [article_id_model_arg]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    });
}

// Note - article_id_model_arg can be named anything but I have named it in such a way that I can understand that it does not need to match endpoint :param
// Returning rows[0] gives us the first object to test against

module.exports = fetchArticlesById;
