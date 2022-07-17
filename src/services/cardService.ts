import Cryptr from "cryptr";
import { User } from "@prisma/client";
import { CreateCardData } from "../interfaces/cardInterface.js";
import cardRepository from "../repository/cardRepository.js";
import "../config/config.js";

async function insert(data, user: User) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const passwordHash = cryptr.encrypt(data.password);
    const securityCodeHash = cryptr.encrypt(data.password);

    const card: CreateCardData = {
        userId: user.id,
        title: data.title,
        number: data.number,
        fullName: data.fullName,
        isVirtual: data.isVirtual,
        type: data.type,
        password: passwordHash,
        securityCode: securityCodeHash,
    };

    await cardRepository.insert(card);
}

async function ExistByTitle(title: string) {
    const card = await cardRepository.findByTitle(title);
    if (card) throw { type: "conflict" };
}

async function findByUserId(userId: number) {
    const cards = await cardRepository.findByUserId(userId);
    return cards.map((item) => {
        return { id: item.id, title: item.title };
    });
}

async function findById(id: number, user: User) {
    const card = await cardRepository.findById(id);
    if (!card) throw { type: "notFound" };
    if (card.userId !== user.id) throw { type: "unauthorized" };

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    card.securityCode = cryptr.decrypt(card.securityCode);
    card.password = cryptr.decrypt(card.password);
    return { card };
}

async function remove(id: number) {
    await cardRepository.remove(id);
}

export default {
    insert,
    ExistByTitle,
    findByUserId,
    findById,
    remove,
};
