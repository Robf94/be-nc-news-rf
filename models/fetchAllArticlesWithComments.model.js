const db = require("../db/connection.js");

function fetchAllArticlesWithComments() {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) as comment_count
      FROM comments
      RIGHT JOIN articles ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = fetchAllArticlesWithComments;
