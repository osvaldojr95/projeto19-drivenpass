import { prisma } from "./../config/database.js";
import { CreateCardData } from "../interfaces/cardInterface.js";

async function findById(id: number) {
    return prisma.card.findUnique({
        where: { id },
    });
}

async function findByTitle(title: string) {
    return prisma.card.findUnique({
        where: { title },
    });
}

async function findByUserId(userId: number) {
    return prisma.card.findMany({
        where: { userId },
    });
}

async function insert(createCardData: CreateCardData) {
    await prisma.card.create({
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
