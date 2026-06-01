import { Router } from 'express'
import playthroughController from '../controllers/playthroughController';
import { authenticate } from '../middleware/authenticate';
import participantsRouter from './participantsRouter';

const playthroughRouter = Router();

playthroughRouter.use('/:id/participants', participantsRouter);

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