import s3Client from "../awsConfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

function generateSaltedFilename(originalFilename: string): string {
    const salt = randomBytes(16).toString("hex");
    const extension = originalFilename.split('.').pop();
    return `${salt}.${extension}`;
}
export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
    const saltFilename = generateSaltedFilename(file.originalname);
    const saltedFilePath = `${filePath}/${saltFilename}`;
    const params = {
        Bucket: bucket,
        Key: saltedFilePath,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully uploaded file", data);
        const publicUrl = `https://jevhdzsjeoykeblpcyph.supabase.co/storage/v1/object/public/images/${saltedFilePath}`;
        console.log("Successfully uploaded file", publicUrl);
        return publicUrl
    } catch (error) {
        console.error("Error uploading file", error);
        throw error
    } 
}