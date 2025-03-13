import express, { Request, Response } from 'express';
import { Book } from '../models/Book';
import { getBookById, getBooksByTitleStart, getAllBooks, updateInsertBook } from '../services/BookServices';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    if (req.query.title) {
        const startTitle = req.query.title as string;
        const filteredBooks = await getBooksByTitleStart(startTitle);
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks());
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const filteredBooks = await getBookById(bookId);
    if (filteredBooks) {
        res.json(filteredBooks);
    } else {
        res.status(404).send('Book not found');
    }
});

router.post('/', async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const response = await updateInsertBook(newBook);
    res.json(response);
});

export default router;