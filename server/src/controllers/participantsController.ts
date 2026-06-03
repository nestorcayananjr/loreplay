import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import { addParticipantToPlaythrough, getAllParticipants, updateWinner } from '../services/participantsService'


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
    },
    getParticipants: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playthroughId = Number(req.params.id);
            const participants = await getAllParticipants(playthroughId)
            res.status(201).json(participants)
        } catch(e) {
            next(e)
        }
    },
    patchWinner: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const playthroughId = Number(req.params.id);
            const newWinnerId = Number(req.params.participantId);
            console.log(req.user)
            if (!req.user) throw new AppError("Error finding user", 400)
            const userId = req.user.id

            const updatedWinner = await updateWinner(userId, playthroughId, newWinnerId)
            res.status(201).json(updatedWinner)
        } catch (e) {
            next(e)
        }
    }
}



export default participantsController