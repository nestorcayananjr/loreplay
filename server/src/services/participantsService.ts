import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { getPlaythrough } from "./playthroughService";

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

export const updateWinner = async (userId: number, playthroughId: number, participantId: number) => {
    const playthrough = await getPlaythrough(playthroughId)

    if (!playthrough) throw new AppError("Error updating playthrough: could not find playthorugh", 400);

    if (playthrough.userId !== userId) throw new AppError("Unauthorized: you do not own this playthrough", 403);

    const playthroughIdOfParticipantId = await prisma.participant.findUnique({
        where: {
            id: participantId
        },
        select: {
            playthroughId: true
        }
    })

    if (!playthroughIdOfParticipantId?.playthroughId) throw new AppError("Participant doesn't exist", 400)

    if (playthroughIdOfParticipantId.playthroughId !== playthroughId) throw new AppError("Participant did not partcipate in this playthrough", 400)

    const [_, updatedWinner] = await prisma.$transaction([
        prisma.participant.updateMany({
            where: {
                playthroughId: playthroughId
            },
            data: {
                winner: false
            }
        }),
        prisma.participant.update({
            where: {
                id: participantId
            },
            data: {
                winner: true
            }
        })
    ])

    return updatedWinner;
}