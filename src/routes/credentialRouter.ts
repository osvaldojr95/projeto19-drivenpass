import { Router } from "express";
import {
    create,
    getAll,
    getById,
    remove,
} from "../controllers/credentialController.js";
import validToken from "../middlewares/validToken.js";
import validSchema from "../middlewares/validSchemas.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
    "/credentials",
    validToken,
    validSchema(credentialSchema),
    create
);
credentialRouter.get("/credentials", validToken, getAll);
credentialRouter.get("/credentials/:id", validToken, getById);
credentialRouter.delete("/credentials/:id", validToken, remove);

export default credentialRouter;
