const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

  // create new error var with spread operator and copy err into error;
  let error = { ...err};

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose Bad ObjectId
  console.log(err.name);
  if(err.name === 'CastError') {
    const message = `Resouce not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500 ).json({
    success: false,
    error: error.message || 'Server Error'
  })
}


module.exports = errorHandler;