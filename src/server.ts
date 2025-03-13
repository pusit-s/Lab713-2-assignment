import express, { Request, Response } from 'express';
import { Book } from './models/Book';
import { getBookById, getBooksByTitleStart, getAllBooks, updateInsertBook } from './services/BookServices';

const app = express();
const port = 3000;

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