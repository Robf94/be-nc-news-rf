const db = require("../db/connection.js");

function fetchTopics() {
  return db.query(
    `SELECT
        topics.description,
        topics.slug
      FROM topics`
  )
  .then(({ rows }) => {
    // if (rows.length === 0) {
    //   return Promise.reject({ status: 404, msg: "Not Found " });
    // }
    return rows;
  });
}

module.exports = fetchTopics;
