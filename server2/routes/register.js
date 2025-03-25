const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const registerSchema = Joi.object({
  name:{
              
    first: Joi.string().min(2).required(),
    middle: Joi.string().allow("").optional(),
    last: Joi.string().min(2).required(),
            },
          phone: Joi
            .string()
            .regex(
              /^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/,
              "Not valid isreal phone number!"
            ),
          email: Joi.string().email().required(),
          password: Joi
            .string()
            .regex(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "not valid password, have to be at least one upper case letter, one special charchter, one number and one lowercase letter, at leat 8 digits."
            )
    .required(),
  image: {        
    alt: Joi.string().allow("").optional(),
    url: Joi.string().allow("").uri().optional(),
  },
  address: {
    
    state: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number(),
    zip: Joi.number(),
  },
        isBusiness: Joi.boolean().required()
})

router.post("/", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exists");
    user = new User({...req.body,isAdmin:false});
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);
    
      
    await user.save();
    const token = jwt.sign({_id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin}, process.env.JWTKEY);
      res.status(201).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;