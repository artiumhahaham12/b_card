const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const loginSchema = Joi.object({
  
          email: Joi.string().email().required(),
          password: Joi.string().required(),
  
})

router.post("/", async (req, res) => {
    try {
      const {error} = loginSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("inccorect email or password");
        const result = bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("inccorect email or password");
        const token = jwt.sign({ _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin }, process.env.JWTKEY);
        console.log(token,1);
        
      res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;