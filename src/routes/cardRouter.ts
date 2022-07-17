import { Router } from "express";
import {
    create,
    getAll,
    getById,
    remove,
} from "../controllers/cardController.js";
import validToken from "../middlewares/validToken.js";
import validSchema from "../middlewares/validSchemas.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards", validToken, validSchema(cardSchema), create);
cardRouter.get("/cards", validToken, getAll);
cardRouter.get("/cards/:id", validToken, getById);
cardRouter.delete("/cards/:id", validToken, remove);

export default cardRouter;
