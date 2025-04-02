const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Card = require("../models/Card");
const auth = require("../middlewares/auth");

//give uniq biz number to add new card
async function getUnqueBizNumber() {
  try {
    let result = await Card.aggregate([
      { $group: { _id: null, maxBizNumber: { $max: "$bizNumber" } } },
    ]);
    console.log(result);

    return result[0].maxBizNumber + 1 || 1000;
  } catch (error) {
    console.log(error);
  }
}
//card joi schema
const cardSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string()
    .regex(/^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/)
    .required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().required(),
  image: {
    url: Joi.string().uri(),
    alt: Joi.string(),
  },
  address: {
    state: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number(),
    zip: Joi.number(),
  },
  bizNumber: Joi.number(),
  user_id: Joi.string(),
});
//add card
router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req.auth);
    
    if (!req.auth.isBusiness) return res.status(400).send("user not Business");
    req.body = {
      ...req.body,
      user_id: req.auth._id,
      bizNumber: await getUnqueBizNumber(),
    };
    const { error } = cardSchema.validate(req.body);
    if (error) return next(error);
    let card = new Card(req.body);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    next(error);
  }
});
//get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find(
      {},
      { createdAt: 0, user_id: 0, _id: 0, __v: 0 }
    );
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});
//my cards
router.get("/my-cards", auth, async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.auth._id });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});
//get card by id
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
//update card
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let card = await Card.findById(req.params.id);
    if (!(req.auth._id === card.user_id))
      return res.status(400).send("not allowed");
    card = await Card.updateOne(
      { _id: req.params.id },
      { ...req.body, user_id: card.user_id }
    );
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
//router like
router.patch("/:id", auth, async (req, res) => {
  try {
    let message = "";
    let card = await Card.findById(req.params.id);
    card.markModified("likes");

    for (const index in card.likes) {
      if (card.likes[index] === req.auth._id) {
        card.likes.splice(Number(index), 1);

        message = "card unliked";
      }
    }
    if (message == "") {
      card.likes.push(req.auth._id);
      message = "card liked";
    }
    await card.save();
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
//delete card
router.delete("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!(req.auth.isAdmin || req.auth._id == card.user_id))
      return res.status(400).send("user not allowed!");
    card = await Card.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
//change bizNumber
/* recive 
object
{
    "bizNumber":some number
} */
router.put("/:id/bizNumber", auth, async (req, res) => {
  try {
    if (typeof req.body.bizNumber !== "number")
      return res.status(400).send("bizNumber might be number type");
    if (!req.auth.isAdmin) return res.status(400).send("user not allowed");
    let card = await Card.findOne({ bizNumber: req.body.bizNumber });
    if (card) return res.status(400).send("biz number already in use");
    card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
