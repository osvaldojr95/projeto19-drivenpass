import { Request, Response } from "express";
import wifiService from "../services/wifiService.js";

export async function create(req: Request, res: Response) {
    const wifi = res.locals.body;
    const user = res.locals.user;
    const created = await wifiService.insert(wifi, user);
    return res.status(201).send(created);
}

export async function getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const wifi = await wifiService.findByUserId(user.id);
    return res.status(200).send({ wifi });
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    const wifi = await wifiService.findById(+id, user);
    return res.status(200).send(wifi);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    await wifiService.findById(+id, user);
    await wifiService.remove(+id);
    return res.sendStatus(204);
}
