const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500);
    res.json({ message: "Something went wrong!" });
  }
};

module.exports = { errorMiddleware };
