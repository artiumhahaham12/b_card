/* 
import express, { Request, Response } from "express";
import Joi from "joi";
import Card from "../models/Card";
const router = express.Router();

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

    url: Joi
        .string()
        .uri(),
    alt: Joi.string(),

    state: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
});

/* router.get("/", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(400).send(error);
    }
}) 
//add card
router.post("/", async (req: Request, res: Response) => {
    try {
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        let card = new Card(req.body);
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

export {router};
 */