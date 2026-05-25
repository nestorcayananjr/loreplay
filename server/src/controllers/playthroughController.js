import prisma from "../lib/prisma.js";

const playthroughController = {
    getAllPlaythroughs: async (req, res) => {
        try {
            const playthroughs = await prisma.playthrough.findMany({
                where: {
                    userId: req.user.userId
                }
            })

            res.json(playthroughs).status(200)
        } catch (error) {
            res.json(error.message).status(400)
        }
    },
    createPlaythrough: async (req, res) => {
        try {
            const { game, playDate, location, notes, participants } = req.body;
            const userId = req.user.userId;

            const playthrough = await prisma.playthrough.create({
                data: {
                    game,
                    userId,
                    playDate: new Date(playDate),
                    location,
                    notes,
                    participants: {
                        create: participants.map(p => ({
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
            res.status(400).json(error.message)
        }
    }
}

export default playthroughController