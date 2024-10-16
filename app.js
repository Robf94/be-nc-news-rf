const express = require("express");
const app = express();
const controllers = require("./controllers/index.js");
const { notFound, customError, badRequest, psqlColNotFound, notNullViolation, internalServerError } = require("./middleware/errorHandlers.js");

// Endpoints

// GET
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
// Get users
app.get("/api/users", controllers.getAllUsers)

// POST
app.use(express.json());
// Post comments
app.post("/api/articles/:article_id/comments", controllers.postComment);

// PATCH
// Update article by article_id
app.patch("/api/articles/:article_id", controllers.patchArticle);

// DELETE
// Delete comment by comment_id
app.delete("/api/comments/:comment_id", controllers.deleteCommentById);

// Error handlers
// 404
app.use(notFound);
// Custom
app.use(customError);
// Bad request
app.use(badRequest);
// PSQL col not found
app.use(psqlColNotFound);
// Not null violation
app.use(notNullViolation);
// Internal server error
app.use(internalServerError);

module.exports = app;
