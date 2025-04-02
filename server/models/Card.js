const { model, Schema } = require("mongoose");

const cardSchema = new Schema({

    title: {
        type: String,
        minLenght: 2,
        required: true
  },
  subtitle:  {
        type: String,
        minLenght: 2,
        required: true
  },
  description:  {
        type: String,
        minLenght: 2,
        required: true
  },
  phone:  {
        type: String,
        minLenght: 8,
        required: true
  },
  email:  {
        type: String,
        minLenght: 2,
        required: true
  },
  web:  {
        type: String,
        required: true,
        uri:true
  },
  image: {
    url: String,
    alt: String,
  },
  address: {
    state:  {
        type: String,
        minLenght: 2,
        
  },
    country:  {
        type: String,
        minLenght: 2,
        required: true
  },
    city:  {
        type: String,
        minLenght: 2,
        required: true
  },
    street:  {
        type: String,
        minLenght: 2,
        required: true
  },
    houseNumber:  {
        type: String,
        minLenght: 2,
        required: true
  },
    zip: Number,
    
  },
  likes: Array,
  bizNumber: {
      type:Number,
      required:true,
      unique:true
  },
  user_id: String,
      createdAt: {
            type: String,
            default: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  },
});

const Card = model("cards", cardSchema);

module.exports = Card;
