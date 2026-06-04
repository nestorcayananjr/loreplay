import { randomUUID } from "crypto"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import AppError from "../utils/AppError";
import prisma from "../lib/prisma";

const s3 = new S3Client({ region: "us-east-2"})

export const generatePostUrl = async (key: string, contentType: string) => {
    const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
            Bucket: "loreplay-s3-bucket",
            Key: key,
            ContentType: contentType
        }),
        { expiresIn: 300 }
    )

    if (!url) throw new AppError("Error uploading photo", 400)

    return url;
}

export const savePhotoToDatabase = async (key: string, playthrough: string, caption: string | null = null) => {
    const photo = await prisma.photo.create({
        data: {
            url: key,
            playthroughId: Number(playthrough),
            caption: caption,
        }
    })

    if (!photo) throw new AppError("Error saving photo", 400)
    
    return photo
}