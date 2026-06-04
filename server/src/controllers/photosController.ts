import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generatePostUrl, savePhotoToDatabase } from '../services/photosService';
import { randomUUID } from "crypto";

const photosController = {
    getPostUrl: async (req: Request, res: Response, next: NextFunction) => {        
        try {
            const key = `playthroughs/${req.params.id}/${randomUUID()}.jpg`
            const contentType = req.body.contentType

            // create the url to send to the client
            const url = await generatePostUrl(key, contentType)

            res.status(201).json({ url, key })
        } catch (error) {
            next(error)
        }
    },
    createPhotoEntry: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { key, caption } = req.body
            const playthroughId = req.params.id as string

            const photo = await savePhotoToDatabase(key, playthroughId, caption)

            res.status(200).json(photo)
        } catch (error) {
            next(error)
        }
    }

}

export default photosController