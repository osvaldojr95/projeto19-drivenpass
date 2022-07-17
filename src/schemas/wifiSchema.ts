import Joi from "joi";
import { Wifi } from "@prisma/client";

const wifiSchema = Joi.object<Wifi>({
    title: Joi.string().required(),
    networkName: Joi.string().required(),
    password: Joi.string().required(),
});

export default wifiSchema;
