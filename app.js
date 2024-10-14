const express = require("express");
const app = express();

const getTopics = require("./controllers/getTopics.js");

app.get("/api/topics", getTopics);

module.exports = app;
