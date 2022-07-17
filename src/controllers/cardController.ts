import { Request, Response } from "express";
import cardService from "../services/cardService.js";

export async function create(req: Request, res: Response) {
    const note = res.locals.body;
    const user = res.locals.user;
    await cardService.ExistByTitle(note.title);
    await cardService.insert(note, user);
    return res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const notes = await cardService.findByUserId(user.id);
    return res.status(200).send({ notes });
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    const note = await cardService.findById(+id, user);
    return res.status(200).send(note);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    await cardService.findById(+id, user);
    await cardService.remove(+id);
    return res.sendStatus(204);
}
