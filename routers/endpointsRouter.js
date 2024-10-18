const controllers = require("../controllers/index.js");
const endpointsRouter = require("express").Router();

// GET users
endpointsRouter.get("/", controllers.getEndpoints);

module.exports = endpointsRouter;
