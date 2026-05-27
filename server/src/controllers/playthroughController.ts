import prisma from "../lib/prisma";
import { Request, Response, NextFunction } from "express";


const playthroughController = {
    getAllPlaythroughs: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside')
        try {
            const playthroughs = await prisma.playthrough.findMany({
                where: {
                    userId: req.user.id
                }
            })

            res.status(200).json(playthroughs)
        } catch (error) {
            next(error)
        }
    },
    createPlaythrough: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { game, playDate, location, notes, participants } = req.body;
            const userId = req.user.id;

            console.log(userId)

            const playthrough = await prisma.playthrough.create({
                data: {
                    game,
                    userId,
                    playDate: new Date(playDate),
                    location,
                    notes,
                    participants: {
                        create: participants.map((p: { name: string; score: string; winner: boolean; userId: number; }) => ({
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

            res.status(201).json(playthrough)
        } catch (error) {
            next(error)
        }
    }
}

export default playthroughController