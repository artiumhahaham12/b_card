const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const router = express.Router();
//JOI
const usersSchema = Joi.object({
  name: {
    first: Joi.string().min(2).required(),
    middle: Joi.string().allow("").optional(),
    last: Joi.string().min(2).required(),
  },
  phone: Joi.string().regex(
    /^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/,
    "Not valid isreal phone number!"
  ),
  email: Joi.string().email().required(),
  password: Joi.string()
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
  isBusiness: Joi.boolean().required(),
});
//register
router.post("/", async (req, res) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exists");
    user = new User({ ...req.body, isAdmin: false });
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign(
      { _id: user._id, isBusiness: user.isBusiness },
      process.env.JWTKEY
    );
    res.status(201).send({token,user:_.pick(user,["name","isBusiness","phone","email","password","adress","image"])});
  } catch (error) {
    res.status(400).send(error);
  }
});
//get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    
    if (!(req.auth.isAdmin || req.auth._id == req.params.id))
      return res.status(400).send("user not allowed");
    const user = await User.findById(req.params.id, {
      isAdmin: 0,
      password: 0,
      _id: 0,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
// get all users
router.get("/", auth, async (req, res) => {
  try {
    if (!req.auth.isAdmin) return res.status(400).send("user not allowed");
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});
//update user details
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //email unique checking
    let user = await User.findOne({ email: req.body.email });
    //update
    if (user)
      return res.status(200).send("email already exists for other user");
    user = await User.findOneAndReplace({ _id: req.params.id }, req.body);
    if (!user) return res.status(404).send("user not found");
    await user.save();
    res.status(200).send(req.body);
  } catch (error) {
    res.status(400).send(error);
  }
});
//delete user
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!(req.auth.isAdmin || req.auth._id == req.params.id))
      return res.status(400).send("user not allowed");
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("user not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
//patch user's business status
router.patch("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(req.params.id, {
      $set: { isBusiness: !user.isBusiness },
    });
    if (!user) return res.status(404).send("user not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;
