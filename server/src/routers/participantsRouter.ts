import participantsController from "../controllers/participantsController";
import { Router } from "express";
import { authenticate } from "../middleware/authenticate";

const participantsRouter = Router({ mergeParams: true });

participantsRouter.post('/', authenticate, participantsController.addParticipant)
participantsRouter.get('/', authenticate, participantsController.getParticipants)
participantsRouter.patch('/:participantId', authenticate, participantsController.patchWinner)

export default participantsRouter;

