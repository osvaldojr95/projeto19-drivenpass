import Joi from "joi";
import { Credential } from "@prisma/client";

const credentialSchema = Joi.object<Credential>({
    title: Joi.string().alphanum().required(),
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export default credentialSchema;
