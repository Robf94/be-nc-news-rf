const fetchAllUsers = require("../models/fetchAllUsers.model.js");

function getAllUsers(req, res, next) {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getAllUsers;