const controllers = require("../controllers/index.js");
const usersRouter = require("express").Router();

// GET users
usersRouter.get("/", controllers.getAllUsers);

// GET user
usersRouter.get("/:username", controllers.getUserByUsername)

module.exports = usersRouter;
