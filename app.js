const express = require("express");
const app = express();
const controllers = require("./controllers/index.js");
const { notFound, customError, badRequest, internalServerError } = require("./middleware/errorHandlers.js");


// Endpoints
// Get topics
app.get("/api/topics", controllers.getTopics);
// Get endpoints
app.get("/api", controllers.getEndpoints);
// Get articles by article_id
app.get("/api/articles/:article_id", controllers.getArticleById);
// Get all articles
app.get("/api/articles", controllers.getAllArticlesWithComments);
// Get article comments
app.get("/api/articles/:article_id/comments", controllers.getOneArticleWithComments);

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
