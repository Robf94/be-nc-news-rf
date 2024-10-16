const db = require("../db/connection.js");

function addCommentToDb({ body, votes, author, article_id, created_at }) {
  return db
    .query(
      `INSERT INTO comments (body, article_id, author, votes, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [body, article_id, author, votes, created_at]
    )
    .then((result) => {
      return result.rows[0];
    });
}

module.exports = addCommentToDb;
