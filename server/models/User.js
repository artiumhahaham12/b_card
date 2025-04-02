const { array, boolean } = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            minlength: 2,
            required:true
        },
        middle: {
            type: String,
            required:false
        },
        last: {
            type: String,
            minlength: 2,
            required:true
        },
     },
    phone: {
            type: String,
            minlength: 9,
            maxlength: 11,
            required:true
  },
  email:  {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  password:  {
            type: String,
            required:true
  },
  image: {
    url:String,
    alt: String
  },
  address: {
    state: String,
      country: {
        type: String,
        minlength: 2,
        required:true
    },
    city:  {
        type: String,
        minlength: 2,
        required:true
    },
    street:  {
        type: String,
        minlength: 2,
        required:true
    },
    houseNumber: {
        type: Number,
        min: 0,
        required:true
    },
    zip: Number
  },
    isBusiness: {
        type:Boolean,
        required: true,
  },
    isAdmin: {
        type:Boolean,
        required: false,
  },
  logging:{
    time:[],
    block:{
      type:Boolean,
      default:false
    }
  }
});

const User = model("users", userSchema);

module.exports = User;