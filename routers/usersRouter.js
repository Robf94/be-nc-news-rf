const controllers = require("../controllers/index.js");
const usersRouter = require("express").Router();

// GET users
usersRouter.get("/", controllers.getAllUsers);

module.exports = usersRouter;
