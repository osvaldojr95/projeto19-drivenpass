import { prisma } from "./../config/database.js";
import { CreateNoteData } from "../interfaces/noteInterface.js";

async function findById(id: number) {
    return prisma.note.findUnique({
        where: { id },
    });
}

async function findByTitle(title: string) {
    return prisma.note.findUnique({
        where: { title },
    });
}

async function findByUserId(userId: number) {
    return prisma.note.findMany({
        where: { userId },
    });
}

async function insert(createNoteData: CreateNoteData) {
    await prisma.note.create({
        data: createNoteData,
    });
}

async function remove(id: number) {
    await prisma.note.delete({
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
