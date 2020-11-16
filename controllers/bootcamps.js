const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    })
  } catch (err) {
   next(err)
  }
  // res.status(200).json({success: true, msg: 'Show all bootcamps', hello: req.hello})
}

// @desc    Get a bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    })
  } catch (err) {
     next(err);
  }
  // res.status(200).json({success: true, msg: 'Show a bootcamp'})
}

// @desc    create a bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
   try  { 
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
    success: true, 
    data: bootcamp
  })
   } catch (err) {
    next(err);
   }
  // console.log(req.body)
  // res.status(200).json({success: true, msg: 'Create a bootcamp'})
  
}

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true,
    });

    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    })
  } catch (err) {
    next(err);
  }
  // res.status(200).json({success: true, msg: 'Update a bootcamp'})
}

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
      res.status(400).json({
        success: false
      })
    }
    res.status(200).json({success: true, data: {}})
  } catch (err) {
      res.status(400).json({
        success: false
      })
  }


  // res.status(200).json({success: true, msg: 'Delete a bootcamp'})
}