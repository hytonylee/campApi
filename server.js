const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// load env var
dotenv.config({ path: './config/config.env'});

// Connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

// initial app
const app = express();

// Dev loggin middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// mount router
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Closer server & exit process
  server.close(() => process.exit(1));
})