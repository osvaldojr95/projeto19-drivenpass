import { prisma } from "./../config/database.js";
import { CreateWifiData } from "../interfaces/wifiInterface.js";

async function findById(id: number) {
    return prisma.wifi.findUnique({
        where: { id },
    });
}

async function findByUserId(userId: number) {
    return prisma.wifi.findMany({
        where: { userId },
    });
}

async function insert(createWifiData: CreateWifiData) {
    await prisma.wifi.create({
        data: createWifiData,
    });
}

async function remove(id: number) {
    await prisma.wifi.delete({
        where: { id },
    });
}

export default {
    findById,
    findByUserId,
    insert,
    remove,
};
