import { Router } from "express";
import {
    create,
    getAll,
    getById,
    remove,
} from "../controllers/wifiController.js";
import validToken from "../middlewares/validToken.js";
import validSchema from "../middlewares/validSchemas.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", validToken, validSchema(wifiSchema), create);
wifiRouter.get("/wifi", validToken, getAll);
wifiRouter.get("/wifi/:id", validToken, getById);
wifiRouter.delete("/wifi/:id", validToken, remove);

export default wifiRouter;
