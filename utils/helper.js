const sendError = (res, message) => {
  return res.status(200).send({
    success: false,
    message: message,
  });
};

const catchError = (res, message, error) => {
  return res.status(500).send({
    success: false,
    message: message,
    error,
  });
};

module.exports = { sendError, catchError };
