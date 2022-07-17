import { User } from "@prisma/client";
import { CreateNoteData } from "../interfaces/noteInterface.js";
import noteRepository from "../repository/noteRepository.js";
import "../config/config.js";

async function insert(data, user: User) {
    const note: CreateNoteData = {
        userId: user.id,
        title: data.title,
        annotation: data.annotation,
    };

    return await noteRepository.insert(note);
}

async function ExistByTitle(title: string) {
    const note = await noteRepository.findByTitle(title);
    if (note) throw { type: "conflict" };
}

async function findByUserId(userId: number) {
    const notes = await noteRepository.findByUserId(userId);
    return notes.map((item) => {
        return { id: item.id, title: item.title };
    });
}

async function findById(id: number, user: User) {
    const note = await noteRepository.findById(id);
    if (!note) throw { type: "notFound" };
    if (note.userId !== user.id) throw { type: "unauthorized" };

    return { note };
}

async function remove(id: number) {
    await noteRepository.remove(id);
}

export default {
    insert,
    ExistByTitle,
    findByUserId,
    findById,
    remove,
};
