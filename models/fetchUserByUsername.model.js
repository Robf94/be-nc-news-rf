const db = require("../db/connection.js");

function fetchUserByUsername(user_model_arg) {
  return db
    .query(
      `
      SELECT * FROM users
      WHERE username = $1
    `,
      [user_model_arg]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" });
      }
      return rows[0];
    });
}

module.exports = fetchUserByUsername;
