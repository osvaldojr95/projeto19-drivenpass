import { prisma } from "./../config/database.js";
import { CreateCredentialData } from "../interfaces/credentialInterface.js";

async function findById(id: number) {
    return prisma.credential.findUnique({
        where: { id },
    });
}

async function findByTitle(title: string) {
    return prisma.credential.findUnique({
        where: { title },
    });
}

async function findByUserId(userId: number) {
    return prisma.credential.findMany({
        where: { userId },
    });
}

async function insert(createCredentialData: CreateCredentialData) {
    await prisma.credential.create({
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
