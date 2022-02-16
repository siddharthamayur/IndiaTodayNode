class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || "Internal server error";
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};

module.exports = {
  CustomError,
  handleError
};
