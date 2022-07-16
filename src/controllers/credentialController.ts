import { Request, Response } from "express";
import credentialService from "../services/credentialService.js";

export async function create(req: Request, res: Response) {
    const credential = res.locals.body;
    const user = res.locals.user;
    await credentialService.credentialExistByTitle(credential.title);
    await credentialService.insert(credential, user);
    return res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const credentials = await credentialService.findByUserId(user.id);
    return res.status(200).send({ credentials });
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    const credential = await credentialService.findById(+id, user);
    return res.status(200).send(credential);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = res.locals.user;
    await credentialService.findById(+id, user);
    await credentialService.remove(+id);
    return res.sendStatus(204);
}
