import { Request, Response } from "express";
import noteService from "../services/noteService.js";

export async function create(req: Request, res: Response) {
    const note = res.locals.body;
    const user = res.locals.user;
    await noteService.ExistByTitle(note.title);
    await noteService.insert(note, user);
    return res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const notes = await noteService.findByUserId(user.id);
    return res.status(200).send({ notes });
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    const note = await noteService.findById(+id, user);
    return res.status(200).send(note);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    await noteService.findById(+id, user);
    await noteService.remove(+id);
    return res.sendStatus(204);
}
