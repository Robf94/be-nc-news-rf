const express = require("express");
const app = express();

const getTopics = require("./controllers/getTopics.js");

app.get("/api/topics", getTopics);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use("/", (req, res) => {
  res.status(500).send({ msg: "Internal server error" });
});

// Error handlers

module.exports = app;
