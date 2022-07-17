import Cryptr from "cryptr";
import { User } from "@prisma/client";
import { CreateWifiData } from "../interfaces/wifiInterface.js";
import wifiRepository from "../repository/wifiRepository.js";
import "../config/config.js";

async function insert(data, user: User) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const passwordHash = cryptr.encrypt(data.password);

    const wifi: CreateWifiData = {
        userId: user.id,
        title: data.title,
        networkName: data.networkName,
        password: passwordHash
    };

    return await wifiRepository.insert(wifi);
}

async function findByUserId(userId: number) {
    const wifi = await wifiRepository.findByUserId(userId);
    return wifi.map((item) => {
        return { id: item.id, title: item.title };
    });
}

async function findById(id: number, user: User) {
    const wifi = await wifiRepository.findById(id);
    if (!wifi) throw { type: "notFound" };
    if (wifi.userId !== user.id) throw { type: "unauthorized" };

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    wifi.password = cryptr.decrypt(wifi.password);
    return { wifi };
}

async function remove(id: number) {
    await wifiRepository.remove(id);
}

export default {
    insert,
    findByUserId,
    findById,
    remove,
};
