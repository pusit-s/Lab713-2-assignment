import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadFile } from './services/UploadFileService';
import dotenv from "dotenv";
import bookRoute from './routes/BookRoute';

dotenv.config();
const app = express();
const port = 3000;
const upload = multer({storage: multer.memoryStorage()});

app.use(express.json());
app.use("/books",bookRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library!');
    });

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.post('/upload', upload.single('file'), async(req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).send('No file uploaded');
            return;
        }

        const bucket = process.env.SUPABASE_BUCKET_NAME
        const filePath = process.env.UPLOAD_DIR

        if (!bucket || !filePath) {
            res.status(500).send('Missing environment variables');
            return;
        }

        const outputUrl = await uploadFile(bucket, filePath, file);
        res.status(200).send(outputUrl);
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});