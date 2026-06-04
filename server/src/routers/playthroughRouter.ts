import { Router } from 'express'
import playthroughController from '../controllers/playthroughController';
import { authenticate } from '../middleware/authenticate';
import participantsRouter from './participantsRouter';
import photosRouter from './photosRouter';

const playthroughRouter = Router();

playthroughRouter.use('/:id/participants', participantsRouter);
playthroughRouter.use('/:id/photos', photosRouter)

// Get all playthroughs for a user
playthroughRouter.get('/', authenticate, playthroughController.getAllPlaythroughs)

// // Get specific playthrough
// playthroughRouter.get('/:id', (req, res) => {
//     res.json('Playthrough received')
// })

// Create playthrough
playthroughRouter.post('/', authenticate, playthroughController.createPlaythrough)

// Edit playthrough

// Delete playthrough

export default playthroughRouter