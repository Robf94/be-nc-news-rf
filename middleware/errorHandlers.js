// 404 not found
const notFound = (req, res) => {
  res.status(404).send({ msg: "Not Found" });
};

// Custom error handler
const customError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err)
};

// 400 bad request
const badRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
  next(err);
};

// 500 internal server error
const internalServerError = (req, res) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { notFound, customError, badRequest, internalServerError };
