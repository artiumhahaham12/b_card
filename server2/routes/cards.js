const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Card = require("../models/Card");
const auth = require("../middlewares/auth");

const cardSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    description: Joi.string().required(),
    phone: Joi
        .string()
        .regex(/^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/)
        .required(),
    email: Joi.string().email().required(),
    web: Joi.string().uri().required(),
    image: {
        
        url: Joi
            .string()
            .uri(),
        alt: Joi.string(),
    },
    address: {
    state: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
    },
     user_id: Joi.string().required(),
});


//add card
router.post("/",auth, async (req, res) => {
    try {
        if (!req.auth.isBusiness) return res.status(400).send("user not Business");
        req.body = {...req.body,user_id:req.auth._id}
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        let card = new Card(req.body);
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});
//get all cards
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error)
    }
})
//get card by id
router.get("/:cardId", async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/my-cards",auth, async (req, res) => {
    try {
        const cards = await Card.find({})
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports= router;

