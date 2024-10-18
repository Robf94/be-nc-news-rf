// Import GET controllers
const getTopics = require("./getTopics.controller.js");
const getEndpoints = require("./getEndpoints.controller.js");
const getArticleById = require("./getArticleById.controller.js");
const getAllArticles = require("./getAllArticles.controller.js");
const getOneArticleWithComments = require("./getOneArticleWithComments.controller.js");
const getAllUsers = require("./getAllUsers.controller.js");
const getUserByUsername = require("./getUserByUsername.controller.js");

// Import POST controllers
const postComment = require("./postComment.controller.js");

// Import PATCH controllers
const patchArticle = require("./patchArticle.controller.js");

// Import DELETE controllers
const deleteCommentById = require("./deleteCommentById.controller.js");

module.exports = {
  getTopics,
  getEndpoints,
  getArticleById,
  getAllArticles,
  getOneArticleWithComments,
  getAllUsers,
  getUserByUsername,
  postComment,
  patchArticle,
  deleteCommentById,
};
