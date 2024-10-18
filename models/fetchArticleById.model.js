const db = require("../db/connection.js");

function fetchArticlesById(article_id_model_arg) {
  return db
    .query(
      `
      SELECT
        articles.*,
        COUNT(comments.comment_id) ::INT AS comment_count
      FROM articles
      LEFT JOIN comments
      ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id
      `,
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
