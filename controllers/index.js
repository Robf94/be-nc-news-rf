const getTopics = require("./getTopics.controller.js");
const getEndpoints = require("./getEndpoints.controller.js");
const getArticleById = require("./getArticleById.controller.js");
const getAllArticlesWithComments = require("./getAllArticlesWithComments.controller.js");
const getOneArticleWithComments = require("./getOneArticleWithComments.controller.js");

module.exports = { getTopics, getEndpoints, getArticleById, getAllArticlesWithComments, getOneArticleWithComments };