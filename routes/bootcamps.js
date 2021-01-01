const express = require('express');
const router = express.Router();
const { 
  getBootcamp, 
  getBootcamps, 
  createBootcamp, 
  updateBootcamp, 
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

// router.get('/', (req, res) => {
//    res.status(200).json({success: true, msg: `display bootcamps ${req.params.id}`})

router.route('/radius/:zipcode/:distance/:unit').get(getBootcampsInRadius);

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);


module.exports = router;
