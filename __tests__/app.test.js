const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("app", () => {
  test("GET: 404 - sends an appropriate status and error message when given an invalid endpoint", () => {
    return request(app)
      .get("/")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });

  describe("/api/topics", () => {
    test("GET: 200 - responds with an array of topic objects with 'slug' and 'description' properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          res.body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("description");
            expect(topic).toHaveProperty("slug");

            expect(typeof topic.description).toBe("string");
            expect(typeof topic.slug).toBe("string");
          });
        });
    });

    test("GET: 200 - should respond with the correct length of the topic data", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body.topics).toHaveLength(3);
        });
    });
  });

  describe("/api", () => {
    test("GET: 200 - responds with an object listing all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(endpoints);
          expect(typeof body.endpoints["GET /api"].description).toBe("string");
        });
    });
  });

  describe("/api/articles/:article_id", () => {
    test("GET: 200 - should return an array of article objects with the relevant objects keys and value data types", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.body).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      // Note - .get(api/articles/1) sets the article to test against, as long as the article_id exists in the test data
    });
    test("GET: 404 - should return appropriate status and message if received a valid id that does not exist", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });

    test("GET: 400 - should return appropriate status and message if received an invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });
  });

  describe("/api/articles", () => {
    test("GET: 200 - should respond with an array of article objects with the relevant properties, including comment_count, sorted by date", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          // Check each property
          articles.forEach((article) => {
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("string");
            // Check body has been removed
            expect(article).not.toHaveProperty("body");
          });
        });
    });

    test("GET: 200 -should return the the array of objects in date descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    test("GET: 200 - should respond with an array of comments for a given article_id with the relevant properties", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.body).toBe("string");
            // Check there are no comments relating to other article_id
            expect(comment.article_id).toBe(1);
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
          });
        });
    });

    test("GET: 200 - should respond with an array of comments for a given article_id, arranged with most recent comments first", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("GET: 404 - should return appropriate status and message if received a valid id that does not exist", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });

    test("GET: 400 - should return appropriate status and message if received an invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });

    test("POST: 201 - should add a comment to the relevant article_id", () => {
      const newComment = {
        body: "I am a comment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 0,
        created_at: new Date(),
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const comment = body.comment;
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(1);
          expect(typeof comment.author).toBe("string");
          expect(comment.votes).toBe(0);
          expect(typeof comment.created_at).toBe("string");
        });
    });

    test("POST: 400 - should return with appropriate error when comment is blank", () => {
      const newComment = {
        body: null,
        article_id: 1,
        author: "butter_bridge",
        votes: 0,
        created_at: new Date(),
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Body cannot be blank!");
        });
    });
  });

  describe("PATCH /api/articles/:article_id", () => {
    test("PATCH: 200 - should INCREASE votes on an article depending on the amount of votes defined in newVote and responds with the updated article", () => {
      const newVote = 5;
      const updateArticle = {
        inc_votes: newVote,
      };
      return request(app)
        .patch("/api/articles/1")
        .send(updateArticle)
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article.votes).toEqual(105);
        });
    });
    test("PATCH: 200 - should DECREASE votes on an article depending on the amount of votes defined in newVote and responds with the updated article", () => {
      const newVote = -100;
      const updateArticle = {
        inc_votes: newVote,
      };
      return request(app)
        .patch("/api/articles/1")
        .send(updateArticle)
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.votes).toEqual(0);
        });
    });
    test("PATCH: 400 - should respond with the relevant error message if incorrect data type", () => {
      const newVote = "not a number";
      const updateArticle = {
        inc_votes: newVote,
      };
      return request(app)
        .patch("/api/articles/1")
        .send(updateArticle)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });

    test("PATCH: 400 - should respond with the relevant error message if body is empty", () => {
      const updateArticle = {};
      return request(app)
        .patch("/api/articles/1")
        .send(updateArticle)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Body cannot be blank!");
        });
    });
  });

  describe("DELETE /api/comments/:comment_id", () => {
    test("DELETE: 204 - should delete the selected comment by comment_id", () => {
      return request(app).delete("/api/comments/2");
    });

    test("DELETE: 404 - responds with appropriate status when given a non-existent comment_id", () => {
      return request(app)
        .delete("/api/comments/99999")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Comment does not exist");
        });
    });
    test("DELETE: 400 - responds with an appropriate status when given an invalid id", () => {
      return request(app)
        .delete("/api/comments/not-a-comment")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
  });

  describe("GET /api/users", () => {
    test("GET: 200 - should respond with an array of user objects each containing username, name, and avatar_url", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.users.forEach((user) => {
            expect(user).toHaveProperty("username", "name", "avatar_url");

            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
        });
    });
    test("GET: 404 - should respond with the relevant status when when mis-typing endpoint", () => {
      return request(app)
        .get("/api/userz")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
  });
});
