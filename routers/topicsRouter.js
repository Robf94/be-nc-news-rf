const controllers = require("../controllers/index.js");
const topicsRouter = require("express").Router();

// GET topics
topicsRouter.get("/", controllers.getTopics);

module.exports = topicsRouter;
