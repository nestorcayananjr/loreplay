import { Playthrough } from "@prisma/client";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { Participant } from "@prisma/client";

interface NewPlaythroughInput {
    game: string,
    userId: number,
    playDate: Date,
    location: string,
    notes: string,
    participants: Participant[]
}

export const getUserPlaythroughs = async (id: number): Promise<Playthrough[]> => {
    const playthroughs = await prisma.playthrough.findMany({
        where: {
            userId: id
        }
    })

    if (!playthroughs) throw new AppError("Error finding playthroughs", 500)

    return playthroughs
}

export const getPlaythrough = async (id: number): Promise<Playthrough> => {
    const playthrough = await prisma.playthrough.findUnique({
        where: {
            id: id
        }
    })

    if (!playthrough) throw new AppError("Invalid playthrough id", 500)

    return playthrough
}

export const createNewPlaythrough = async (data: NewPlaythroughInput) => {
    const { game, userId, playDate, location, notes, participants } = data
    const playthrough = await prisma.playthrough.create({
        data: {
            game,
            userId,
            playDate: new Date(playDate),
            location,
            notes,
            participants: {
                create: participants.map((p: Participant) => ({
                    name: p.name,
                    score: p.score,
                    winner: p.winner,
                    userId: p.userId ?? null
                })
            )}
        },
        include: {
            participants: true
        }
    })

    if (!playthrough) throw new AppError("Error creating new playthrough", 500)

    return playthrough
}