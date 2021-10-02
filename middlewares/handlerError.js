const handlerError = (err, req, res, next) => {
  res.status(err.code || 500).json({
    message: err.message || "internal server error"
  });
};

module.exports = handlerError;
