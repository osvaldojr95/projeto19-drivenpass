import Joi from "joi";
import { Note } from "@prisma/client";

const noteSchema = Joi.object<Note>({
    title: Joi.string().max(50).required(),
    annotation: Joi.string().required().max(1000),
});

export default noteSchema;
