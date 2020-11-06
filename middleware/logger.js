// @desc    log description to console (test middleware)
const logger = (req, res, next) => {
  req.hello = 'Hello World';  // set var to request obj, so, avaiable to all routesß
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);  // return => METHOD http://localhost:5000/api/v1/bootcamps/
  next();  // use this fn to move on to next middleware
}

module.exports = logger;

//To use in server.js
// const logger = require('../middleware/logger);
// app.use(logger); // need to use this to use middleware