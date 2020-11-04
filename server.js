const express = require('express');
const dotenv = require('dotenv');

// load env var
dotenv.config({ path: './config/config.env'});

// initial app
const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, msg: 'Show all bootcamps'})
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, msg: `display a bootcamp ${req.params.id}`})
})

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, msg: 'create a bootcamp'})
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, msg: `update a bootcamp ${req.params.id}`})
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, msg: `delete a bootcamp ${req.params.id}`})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));