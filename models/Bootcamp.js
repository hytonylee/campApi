const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a bootcamp name.'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.'],
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'Please add add bootcamp description'],
    maxlength: [500, 'Description cannot be more than 500 characters.']
  },
  website: {
    type: String,
    match: [ /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 
    'Please use a valid URL with HTTP or HTTPS'
    ]
  }, 
  phone: {
    type: String,
    maxlength: [20, 'Phone number field cannot be longer than 20 charactters']
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJson Point
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of Strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be a least 1.'],
    max: [10, 'Rating must not be more than 10.']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// use slugify middleware
// create bootcamp slug from the name
BootcampSchema.pre('save', function(next){
  // console.log('Slugify ran', this.name);
  this.slug = slugify(this.name, {lower: true})
  next();
})

// geocode & create location field
BootcampSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zip: loc[0].zipCode,
    country: loc[0].countryCode,
  }
  
  // Do not save address in db
  this.address = undefined;
  next();
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);