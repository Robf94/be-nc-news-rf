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
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  describe("/api/topics", () => {
    test("GET: 200 - responds with an array of topic objects with 'slug' and 'description' properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const topics = body.topics;

          expect(topics).toHaveLength(3);

          topics.forEach((topic) => {
            expect(Object.keys(topic)).toEqual(["description", "slug"]);

            expect(typeof topic.description).toBe("string");
            expect(typeof topic.slug).toBe("string");
          });
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
    test("GET: 200 - should return an article object with with article_id of 1, with the relevant objects keys and values", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.article_id).toBe(1);
          expect(article.title).toBe("Living in the shadow of a great man");
          expect(article.topic).toBe("mitch");
          expect(article.author).toBe("butter_bridge");
          expect(article.body).toBe("I find this existence challenging");
          expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
          expect(article.votes).toBe(100);
          expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
          expect(article.comment_count).toBe(11);
        });
      // Note - .get(api/articles/1) sets the article to test against, as long as the article_id exists in the test data
    });
    test("GET: 404 - should return appropriate status and message if received a valid id that does not exist", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });

    test("GET: 400 - should return appropriate status and message if received an invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
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
            expect(typeof article.comment_count).toBe("number");
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
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });

    test("GET: 400 - should return appropriate status and message if received an invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });

    test("POST: 201 - should add a comment to the relevant article_id", () => {
      const newComment = {
        body: "I am a comment!",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: new Date(),
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const comment = body.comment;
          expect(comment.comment_id).toBe(19);
          expect(comment.body).toBe("I am a comment!");
          expect(comment.article_id).toBe(1);
          expect(comment.author).toBe("icellusedkars");
          expect(comment.votes).toBe(0);
          expect(typeof comment.created_at).toBe("string");
        });
    });

    test("POST: 400 - should return with appropriate error when comment is blank", () => {
      const newComment = {
        body: null,
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: new Date(),
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Missing required fields");
        });
    });

    test("POST: 400 - should return appropriate status when complete body is missing", () => {
      const newComment = {};
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.comment).toBe(undefined);
          expect(body.msg).toBe("Missing required fields");
        });
    });

    test("POST: 400 - should return error when article_id is invalid", () => {
      const newComment = {
        body: "This comment should not be added!",
        author: "icellusedkars",
        votes: 0,
        created_at: new Date(),
      };
      return request(app)
        .post("/api/articles/invlaid-article-id/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article_id");
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
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });

    test("PATCH: 400 - should respond with the relevant error message if body is empty", () => {
      const updateArticle = {};
      return request(app)
        .patch("/api/articles/1")
        .send(updateArticle)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Body cannot be blank!");
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
        .then(({ body }) => {
          expect(body.msg).toBe("Comment does not exist");
        });
    });
    test("DELETE: 400 - responds with an appropriate status when given an invalid id", () => {
      return request(app)
        .delete("/api/comments/not-a-comment")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
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

  describe("GET /api/users/:username", () => {
    test("GET: 200 - should respond with an object of the given username", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body }) => {
          const user = body.user;
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
    });

    test("GET: 404 - should respond with approprate status when given a valid, but non-existent username", () => {
      return request(app)
        .get("/api/users/idontexistyet")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("User does not exist");
        });
    });
  });

  describe("GET - /api/articles (sorting queries)", () => {
    test("should sort articles by comment_count in ascending order", () => {
      return request(app)
        .get("/api/articles?sort_by=comment_count&order=ASC")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSortedBy("comment_count", { ascending: true });
        });
    });
    test("GET: 200 - should sort articles by votes in descending order", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=DESC")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSortedBy("votes", { descending: true });
        });
    });

    test("GET: 200 - should return default sorting if invalid sort_by column is entered", () => {
      return request(app)
        .get("/api/articles?sort_by=invalid_col&order=DESC")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
    describe("GET - /api/articles?topic= filtering by query", () => {
      test("GET: 200 - should filter the articles by the topic 'mitch'", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
          });
      });
      test("GET: 200 - should respond with all articles if topic query is omitted ", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(13);
          });
      });
      test("GET: 404 - should respond with appropriate status if non-existent topic is requested", () => {
        return request(app)
          .get("/api/articles?topic=blahblahblah")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Topic Not Found");
          });
      });
    });
  });

  describe("GET - /api/articles/:article_id (comment_count)", () => {
    test("GET: 200 - should return the total amount of all comments for a specific article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(typeof article.comment_count).toBe("number");
        });
    });
  });
});
