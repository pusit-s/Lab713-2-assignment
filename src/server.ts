import express, { Request, Response } from 'express';
import { Book } from './models/Book';
import { getBookById, getBooksByTitleStart, getAllBooks, updateInsertBook } from './services/BookServices';
import multer from 'multer';
import { uploadFile } from './services/UploadFileService';

const app = express();
const port = 3000;
const upload = multer({storage: multer.memoryStorage()});


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library!');
    });

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/books', async (req: Request, res: Response) => {
    if (req.query.title) {
        const startTitle = req.query.title as string;
        const filteredBooks = await getBooksByTitleStart(startTitle);
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks());
    }
});

app.get('/books/:id', async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const filteredBooks = await getBookById(bookId);
    if (filteredBooks) {
        res.json(filteredBooks);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const response = await updateInsertBook(newBook);
    res.json(response);
});

app.post('/upload', upload.single('file'), async(req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).send('No file uploaded');
            return;
        }

        const bucket = 'images';
        const filePath = `uploads/${file.originalname}`;
        await uploadFile(bucket, filePath, file);
        
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});