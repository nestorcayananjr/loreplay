import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import photosController from "../controllers/photosController";

const photosRouter = Router({ mergeParams: true });

photosRouter.post('/', authenticate, photosController.createPhotoEntry)
photosRouter.post('/upload-url', authenticate, photosController.getPostUrl)

export default photosRouter;

