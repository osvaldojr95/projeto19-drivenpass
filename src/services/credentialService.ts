import Cryptr from "cryptr";
import { User } from "@prisma/client";
import { CreateCredentialData } from "../interfaces/credentialInterface.js";
import credentialRepository from "../repository/credentialRepository.js";
import "../config/config.js";

async function insert(data, user: User) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const passwordHash = cryptr.encrypt(data.password);

    const credential: CreateCredentialData = {
        userId: user.id,
        title: data.title,
        url: data.url,
        username: data.username,
        password: passwordHash,
    };

    await credentialRepository.insert(credential);
}

async function credentialExistByTitle(title: string) {
    const credential = await credentialRepository.findByTitle(title);
    if (credential) throw { type: "conflict" };
}

async function findByUserId(userId: number) {
    const credentials = await credentialRepository.findByUserId(userId);
    return credentials.map((item) => {
        return { id: item.id, title: item.title };
    });
}

async function findById(id: number, user: User) {
    const credential = await credentialRepository.findById(id);
    if (!credential) throw { type: "notFound" };
    if (credential.userId !== user.id) throw { type: "unauthorized" };

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    credential.password = cryptr.decrypt(credential.password);
    return { credential };
}

async function remove(id: number) {
    await credentialRepository.remove(id);
}

export default {
    insert,
    credentialExistByTitle,
    findByUserId,
    findById,
    remove,
};
