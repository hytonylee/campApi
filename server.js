const express = require('express');
const dotenv = require('dotenv');

// load env var
dotenv.config({ path: './config/config.env'});

// initial app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));