const express = require("express");
const app = express();
const getTopics = require("./controllers/getTopics.controller.js");
const getEndpoints = require("./controllers/getEndpoints.controller.js");
const getArticleById = require("./controllers/getArticleById.controller.js");
const getAllArticlesWithComments = require("./controllers/getAllArticlesWithComments.controller.js");
const { notFound, customError, badRequest, internalServerError } = require("./middleware/errorHandlers.js");

// Endpoints
// Get topics
app.get("/api/topics", getTopics);
// Get endpoints
app.get("/api", getEndpoints);
// Get articles by article_id
app.get("/api/articles/:article_id", getArticleById);
// Get all articles
app.get("/api/articles", getAllArticlesWithComments);

// Error handlers
// 404
app.use(notFound);
// Custom
app.use(customError);
// Bad request
app.use(badRequest);
// Internal server error
app.use(internalServerError);

module.exports = app;
