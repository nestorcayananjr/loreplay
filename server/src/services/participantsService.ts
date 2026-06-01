import { Participant } from "@prisma/client";
import prisma from "../lib/prisma";
import { getPlaythrough } from "./playthroughService";
import AppError from "../utils/AppError";

interface ParticipantInput {
    name: string,
    playthroughId: number,
    userId: number | null,
    score: string | null;
    winner: boolean;
    status: string;
}

export const addParticipantToPlaythrough = async (data: ParticipantInput) => {
    const { name, playthroughId, userId, score, winner, status} = data;

    const participant = await prisma.participant.create({
        data: {
            name,
            playthroughId,
            userId,
            score,
            winner,
            status
        }
    })

    if (!participant) throw new AppError("Error creating new participant", 500)

    return participant;
}
