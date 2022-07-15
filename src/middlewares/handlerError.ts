import { Request, Response, NextFunction } from "express";

export default async function handlerError(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Error: ", error);
    return res.sendStatus(500);
}
