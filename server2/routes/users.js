
const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const router = express.Router();

const usersSchema = Joi.object({
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


//get user by id 
router.get("/:userId", auth, async (req, res) => {
    try {
        if (!req.auth.isAdmin) return res.status(400).send("user not allowed");
        const user = await User.findById(req.params.userId);
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
router.put("/:userId", auth, async (req, res) => {
    try {
        const { error } = usersSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //email unique checking
        let user = await User.findOne({ email: req.body.email });
        //update
        if (user) return res.status(200).send("email already exists for other user");
        user = await User.findOneAndReplace({_id:req.params.userId},req.body);
        if (!user) return res.status(404).send("user not found");
        await user.save();
        res.status(200).send("user has been updated succefully");
    } catch (error) {
        res.status(400).send(error);
    }
})
//delete user
router.delete("/:userId", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).send("user not found");
        res.status(200).send("user has been deleted succefully");
    } catch (error) {
        res.status(400).send(error);
    }
})
//patch user's business status
router.patch("/:userId", auth, async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        user = await User.findByIdAndUpdate(req.params.userId,{$set:{isBusiness:!user.isBusiness}});
        if (!user) return res.status(404).send("user not found");
        res.status(200).send("status updated");
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
