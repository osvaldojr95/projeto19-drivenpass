import { Request, Response } from "express";
import cardService from "../services/cardService.js";

export async function create(req: Request, res: Response) {
    const card = res.locals.body;
    const user = res.locals.user;
    await cardService.ExistByTitle(card.title);
    const created = await cardService.insert(card, user);
    return res.status(201).send(created);
}

export async function getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const cards = await cardService.findByUserId(user.id);
    return res.status(200).send({ cards });
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    const card = await cardService.findById(+id, user);
    return res.status(200).send(card);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    await cardService.findById(+id, user);
    await cardService.remove(+id);
    return res.sendStatus(204);
}
