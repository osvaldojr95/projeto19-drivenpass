import { prisma } from "./../config/database.js";
import { Session } from "@prisma/client";
import { CreateSessionData } from "../interfaces/sessionInterface.js";

async function findBySession(sessionId: string) {
    return prisma.session.findFirst({
        where: { session: sessionId },
    });
}

async function findByUserId(userId: number) {
    return prisma.session.findFirst({
        where: { userId },
    });
}

async function insert(createSessionData: CreateSessionData) {
    await prisma.session.create({
        data: createSessionData,
    });
}

async function remove(id: number) {
    await prisma.session.delete({
        where: { id },
    });
}

export default {
    findBySession,
    findByUserId,
    insert,
    remove,
};
