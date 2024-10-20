# Northcoders News API

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

---

## Table of Contents

- [About](#about)
- [API](#api)
- [Summary](#summary)
- [Contribute](#contribute)
- [dotenv](#dotenv)
- [Required Versions](#required-versions)

## About

The Northcoders News API allows for the posting of news articles by users of the platform for others to read, vote, and comment upon.

## API

The API can be found here:
https://be-nc-news-rf-1.onrender.com/api

## Summary

### Basic Functionality

This app acts as a hub for all things Northcoders. It allows users to post articles, comment, vote and sort articles depending on their preferences.

### Current Endpoint Features

#### `GET /api`

Details all of the available API endpoints and their functionality.

#### `GET /api/topics`

Responds with an array of topics objects with a slug and a description.

#### `GET /api/articles/:article_id`

Responds with an article object when given a valid `article_id`. This object includes:

- author
- title
- article_id
- body
- topic
- created_at
- votes
- article_img_url

Additional functionality has been added to this endpoint:

##### Add comment_count

The article response now includes a `comment_count` relevant to the given `article_id`.

#### `GET /api/articles`

Responds with an array of all article objects. The objects include:

- author
- title
- article_id
- topic
- created_at
- votes
- article_img_url
- comment_count

These are sorted by default in reverse chronological order.

Note the absence of the article body.

Additional functionality has been added to this endpoint:

##### Sorting queries

This endpoint accepts the following queries:

- comment_count, created_at, article_id, title, votes, author, topic (default is created_at)
- order ASC or DESC (default is DESC)

##### Topic filter query

Accepts the topic query that allows articles to be filtered by the given topic.

#### GET /api/articles/:article_id/comments

Responds with an array of comment objects for the provided valid `article_id`. The objects include:

- comment_id
- votes
- created_at
- author
- body
- article_id

By default they are sorted in reverse chronological order.

#### `POST /api/articles/:article_id/comments`

Allows for adding a comment to a given `article_id`. The request body should accept:

- username (author)
- body

Should respond with the posted comment.

#### `PATCH /api/articles/:article_id`

Allows for a given article to be updated.

The request body accepts:

- An object in the form `({ inc_votes: newVote })`
- `newVote` will indicate how much the votes property in the database should be updated by

Should respond with the update article.

#### `DELETE /api/comments/:comment_id`

Allows for the deletion of a given comment.

Should respond with status `204 no content`.

#### `GET /api/users`

Responds with an array of user objects with the following properties:

- username
- name
- avatar_url

For more information on each endpoint, please refer to `endpoints.json`.

## Contribute

### Fork

If you would like to create an individual project, please fork the repo by clicking "Fork" at the top of this project page.

### Clone

If you would like to clone this project, please run `git clone https://github.com/Robf94/be-nc-news-rf.git` in your command line, or use your preferred method.

Following approval, please request the relevant permissions from myself to be granted access to the database.

### Dependencies

This project requires the following dependencies:

```
"devDependencies": {
  "husky": "^8.0.2",
  "jest": "^27.5.1",
  "jest-extended": "^2.0.0",
  "jest-sorted": "^1.0.15",
  "pg-format": "^1.0.4",
  "supertest": "^7.0.0"
},
"dependencies": {
  "dotenv": "^16.0.0",
  "express": "^4.21.1",
  "nodemon": "^3.1.7",
  "pg": "^8.7.3"
},
```

More info can be found in `package.json`. Run `npm install` to install the require dependencies.

## Scripts

A number of scripts have been setup for your convenience:

```
"scripts": {
  "setup-dbs": "psql -f ./db/setup.sql",
  "seed": "node ./db/seeds/run-seed.js",
  "check": "psql -f db/check.sql> checksql.txt",
  "test": "jest",
  "prepare": "husky install",
  "start": "node listener.js",
  "seed-prod": "NODE_ENV=production npm run seed"
},
```

### Databse Setup and Seeding

For this, you will need to run the following scripts:

`npm run setup-dbs` to create the database.

`npm run seed` to seed all the data.

`npm run seed-prod` to seed the production database when needed.

`npm start` will start a listener for you to be able to use an app such as Insomnia to test requests and responses.

`npm run check` allows for the checking of the populated data, and can be amended as needed for whatever you need to check.

### Testing

Jest and SuperTest are used for testing.

`npm test` will initialise the test suite.

## dotenv

Following approval, the releveant dotenv files will be provided for the project. The files will be as follows:

`.env.test` for testing database.

`.env.development` for development database.

`.env.production` for production database.

## Required Versions

The minimum required version of node.js is `"node": ">=6.0.0:`

The minimum required version of PostgreSQL is `"pg": "^8.7.3"`
