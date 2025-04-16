const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function followTries(logging) {
  const now = new Date();
  const past24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  let lastTries = [];
  for (const times of logging.time) {
    if (times.getTime() >= past24Hours) {
      lastTries.push(times);
    }
  }
  if (lastTries.length >= 3) {
    return true;
  } else {
    return false;
  }
}

router.post("/", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("inccorect email or password");
    if (followTries(user.logging))
      return res
        .status(400)
        .send("more then 3 tries last 24h access had been blocked");
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      user.logging.time.push(new Date());
      user.logging.block = followTries(user.logging);
      await user.save();
      return res.status(400).send("inccorect email or password");
    } else {
      user.logging.time = [];
      user.block = false;
      const token = jwt.sign(
        { _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
        process.env.JWTKEY
      );
      await user.save();
      res.status(200).send(token);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
