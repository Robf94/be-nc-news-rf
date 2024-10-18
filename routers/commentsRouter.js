const controllers = require("../controllers/index.js");
const commentsRouter = require("express").Router();

// GET users
commentsRouter.delete("/:comment_id", controllers.deleteCommentById);

module.exports = commentsRouter;
