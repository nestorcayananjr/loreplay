import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import authRouter from './src/routers/authRouter.js';
import playthroughRouter from './src/routers/playthroughRouter.js';


const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => {
    res.send(`Server is running.`)
})

app.use('/api/auth', authRouter)
app.use('/api/playthroughs', playthroughRouter)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})