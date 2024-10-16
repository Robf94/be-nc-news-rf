const db = require("../db/connection.js");

function fetchAllUsers() {
  return db
    .query(
      `SELECT *
      FROM users`
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}

module.exports = fetchAllUsers;
