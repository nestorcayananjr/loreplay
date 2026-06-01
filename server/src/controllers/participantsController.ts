import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import { addParticipantToPlaythrough } from '../services/participantsService'


const participantsController = {
    addParticipant: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playthroughId = Number(req.params.id);
            const newParticipant = req.body;

            if (!newParticipant) throw new AppError("Please provide participant data", 400)

            const participant = await addParticipantToPlaythrough({playthroughId: playthroughId, ...newParticipant})
            res.status(201).json(participant)
        } catch (e) {
            next(e)
        }
    }
}

export default participantsController