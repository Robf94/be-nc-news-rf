// 404 not found
const notFound = (req, res) => {
  res.status(404).send({ msg: "Not Found" });
};

// Custom error handler
const customError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

// 400 bad request
const badRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
  next(err);
};

// PSQL col not found
const psqlColNotFound = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(404).send({ msg: "PSQL column not found" });
  }
  next(err);
};

// Not null violation
const notNullViolation = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Comment body cannot be blank!" });
  }
  next(err);
};

// 500 internal server error
const internalServerError = (req, res) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { notFound, customError, badRequest, psqlColNotFound, notNullViolation, internalServerError };
