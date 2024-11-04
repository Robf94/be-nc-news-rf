const express = require("express");
const app = express();
const controllers = require("./controllers/index.js");
const routers = require("./routers/routerIndex.js");
const { notFound, customError, badRequest, psqlColNotFound, notNullViolation, internalServerError } = require("./middleware/errorHandlers.js");
const cors = require("cors");

app.use(cors());

app.use(express.json());

// Routers

// API endpoints
app.use("/api", routers.endpointsRouter);
// Articles
app.use("/api/articles", routers.articlesRouter);
// Users
app.use("/api/users", routers.usersRouter);
// Topics
app.use("/api/topics", routers.topicsRouter);
// Comments
app.use("/api/comments", routers.commentsRouter);

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
