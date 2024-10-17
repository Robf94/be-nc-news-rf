const fetchAllArticles = require("../models/fetchAllArticles.model.js");

function getAllArticles(req, res, next) {
  const { sort_by = "created_at", order = "DESC" } = req.query;
  fetchAllArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getAllArticles;
