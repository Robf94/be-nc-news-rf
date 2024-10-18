const controllers = require("../controllers/index.js");
const articlesRouter = require("express").Router();

// GET all articles
articlesRouter.get("/", controllers.getAllArticles);

// GET single article by ID
articlesRouter.get("/:article_id", controllers.getArticleById);

// GET comments for a specific article
articlesRouter.get("/:article_id/comments", controllers.getOneArticleWithComments);

// POST comment on a specific article
articlesRouter.post("/:article_id/comments", controllers.postComment);

// PATCH an article to update votes
articlesRouter.patch("/:article_id", controllers.patchArticle);

module.exports = articlesRouter;
