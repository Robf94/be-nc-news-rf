const express = require("express");
const app = express();
const getTopics = require("./controllers/getTopics.controller.js");
const getEndpoints = require("./controllers/getEndpoints.controller.js");
const getArticlesById = require("./controllers/getArticleById.controller.js");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticlesById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use("/", (req, res) => {
  res.status(500).send({ msg: "Internal server error" });
});

// Error handlers

// 404 Not Found
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

// 400 Bad Request
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({msg: "Bad Request"})
  }
})
module.exports = app;
