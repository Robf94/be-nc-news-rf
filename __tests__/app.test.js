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
          expect(typeof body.endpoints["GET /api/articles"].description).toBe("string");
        });
    });
  });
});
