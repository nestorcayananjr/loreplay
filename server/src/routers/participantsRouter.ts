import participantsController from "../controllers/participantsController";
import { Router } from "express";

const participantsRouter = Router({ mergeParams: true });

participantsRouter.post('/', participantsController.addParticipant)

export default participantsRouter;

