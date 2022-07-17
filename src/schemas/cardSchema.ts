import Joi from "joi";
import { Card } from "@prisma/client";

const cardSchema = Joi.object<Card>({
    title: Joi.string().required(),
    number: Joi.string()
        .pattern(/^[0-9]/)
        .length(16)
        .required(),
    fullName: Joi.string().required(),
    securityCode: Joi.string()
        .pattern(/^[0-9]/)
        .length(3)
        .required(),
    password: Joi.string()
        .pattern(/^[0-9]/)
        .length(4)
        .required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().alphanum().valid("credit", "debit", "both"),
});

export default cardSchema;
