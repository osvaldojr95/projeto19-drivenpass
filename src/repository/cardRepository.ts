import { prisma } from "./../config/database.js";
import { CreateCardData } from "../interfaces/cardInterface.js";

async function findById(id: number) {
    return await prisma.card.findUnique({
        where: { id },
    });
}

async function findByTitle(title: string) {
    return await prisma.card.findUnique({
        where: { title },
    });
}

async function findByUserId(userId: number) {
    return await prisma.card.findMany({
        where: { userId },
    });
}

async function insert(createCardData: CreateCardData) {
    return await prisma.card.create({
        data: createCardData,
    });
}

async function remove(id: number) {
    await prisma.card.delete({
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
