import express, { Request, Response } from 'express';
import { Book } from './services/BookServices';
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

app.get('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const filteredBooks = getBookById(bookId);
    if (filteredBooks) {
        res.json(filteredBooks);
        } else {
        res.status(404).send('Book not found');
        }
    });

app.get('/books', (req: Request, res: Response) => {
    if (req.query.title) {
        const startTitle = req.query.title as string;
        const filteredBooks = getBooksByTitleStart(startTitle);
        res.json(filteredBooks);
    } else {
        res.json(getAllBooks());
    }
});

app.post('/books', (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const response = updateInsertBook(newBook);
    res.json(response);
});