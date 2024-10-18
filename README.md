# Northcoders News API

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

---

## Table of Contents

- [About](#-about)
- [API](#-api)
- [Summary](#-summary)
- [Contribute](#-contribute)
- [dotenv](#-dotenv)
- [Required Versions](#-required-versions)

## About

The Northcoders News API allows for the posting of news articles by users of the platform for others to read, vote, and comment upon.

## API

The API can be found here:
https://be-nc-news-rf-1.onrender.com/api

## Summary

### Basic Functionality

This app acts as a hub for all things Northcoders. It allows users to post articles, comment, vote and sort articles depending on their preferences.

### Current Endpoint Features

#### GET /api

Details all of the available API endpoints and their functionality.

#### GET /api/topics

Responds with an array of topics objects with a slug and a description.

#### GET /api/articles/:article_id

Responds with an article object when given a valid article_id. This object includes:
- author
- title
- article_id
- body
- topic
- created_at
- votes
- article_img_url

#### GET /api/articles

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

#### GET /api/articles/:article_id/comments

Responds with an array of comment objects for the provided valid article_id. The objects include:
- comment_id
- votes
- created_at
- author
- body
- article_id

By default they are sorted in reverse chronological order.

#### POST /api/articles/:article_id/comments

Allows for adding a comment to a given article_id. The request body should accept:
- username
- body

## Contribute

### Fork

### Clone

### Dependencies

This project requires the following dependencies:

- More info can be found in package.json Run `npm install` to install the require dependencies.

### Seeding

### Testing

## dotenv

## Required Versions

The minimum required version of node.js is

The minimum required version of PostgreSQL is
