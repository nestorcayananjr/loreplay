import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import authRouter from './routers/authRouter';
import playthroughRouter from './routers/playthroughRouter';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => {
    res.send(`Server is running.`)
})

app.use('/api/auth', authRouter)
app.use('/api/playthroughs', playthroughRouter)

app.use(errorHandler)

export default app