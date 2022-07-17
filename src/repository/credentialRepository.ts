import { prisma } from "./../config/database.js";
import { CreateCredentialData } from "../interfaces/credentialInterface.js";

async function findById(id: number) {
    return await prisma.credential.findUnique({
        where: { id },
    });
}

async function findByTitle(title: string) {
    return await prisma.credential.findUnique({
        where: { title },
    });
}

async function findByUserId(userId: number) {
    return await prisma.credential.findMany({
        where: { userId },
    });
}

async function insert(createCredentialData: CreateCredentialData) {
    return await prisma.credential.create({
        data: createCredentialData,
    });
}

async function remove(id: number) {
    await prisma.credential.delete({
        where: { id },
    });
}

export default {
    findById,
    findByTitle,
    findByUserId,
    insert,
    remove,
};
