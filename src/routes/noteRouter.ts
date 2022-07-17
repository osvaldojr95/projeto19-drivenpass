import { Router } from "express";
import {
    create,
    getAll,
    getById,
    remove,
} from "../controllers/noteController.js";
import validToken from "../middlewares/validToken.js";
import validSchema from "../middlewares/validSchemas.js";
import noteSchema from "../schemas/noteSchema.js";

const noteRouter = Router();

noteRouter.post(
    "/notes",
    validToken,
    validSchema(noteSchema),
    create
);
noteRouter.get("/notes", validToken, getAll);
noteRouter.get("/notes/:id", validToken, getById);
noteRouter.delete("/notes/:id", validToken, remove);

export default noteRouter;
