import { Request, Response, NextFunction } from "express";
import { createNewPlaythrough, getUserPlaythroughs } from "../services/playthroughService";
import AppError from "../utils/AppError";


const playthroughController = {
    getAllPlaythroughs: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw new AppError("Please provide a user", 500)
            const user = req.user
            const playthroughs = await getUserPlaythroughs(user.id)
            res.status(200).json(playthroughs)
        } catch (error) {
            next(error)
        }
    },
    createPlaythrough: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw new AppError("Please provide a user", 500)
            const userId = req.user.id;
            const playthrough = await createNewPlaythrough({userId: userId, ...req.body})

            res.status(201).json(playthrough)
        } catch (error) {
            next(error)
        }
    }
}

export default playthroughController