const db = require("../db/connection.js");

function fetchOneArticleWithComments(article_id_model_arg) {
  return db
    .query(
      `SELECT * FROM comments
      where article_id = $1
      ORDER BY created_at desc`,
      [article_id_model_arg]
    )
    .then(({ rows }) => {
      // console.log(rows, "model");
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}

module.exports = fetchOneArticleWithComments;
