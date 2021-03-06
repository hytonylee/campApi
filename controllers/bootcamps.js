const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;
    
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = Bootcamp.find(JSON.parse(queryStr));

    const bootcamps = await query;
    // const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    })
  
  // res.status(200).json({success: true, msg: 'Show all bootcamps', hello: req.hello})
})

// @desc    Get a bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
  // try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    })
  // } catch (err) {
  //    next(err);
  // }
  // res.status(200).json({success: true, msg: 'Show a bootcamp'})
})

// @desc    create a bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
  
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
    success: true, 
    data: bootcamp
  })
  
  // console.log(req.body)
  // res.status(200).json({success: true, msg: 'Create a bootcamp'})
  
});

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
  
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

  // res.status(200).json({success: true, msg: 'Update a bootcamp'})
});

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
 
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
      res.status(400).json({
        success: false
      })
    }
    res.status(200).json({success: true, data: {}})

  // res.status(200).json({success: true, msg: 'Delete a bootcamp'})
});

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access  Private
exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
  const { zipcode, distance, unit } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 6,378 KM or 3,963 mi
  let earthRadius = 0;
  if(unit == "mile") earthRadius = 3693;
  if(unit == "km") earthRadius = 6378;
   
  const radius = distance / earthRadius;
  
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[ lng, lat], radius]}}
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
});