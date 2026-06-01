import prisma from "../lib/prisma";
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

export const getAllParticipants = async (playthoughId: number) => {
    const participants = await prisma.participant.findMany({
        where: {
            playthroughId: playthoughId
        }
    })

    if (!participants) throw new AppError("Error retrieving participants", 500)
    
    return participants;
}