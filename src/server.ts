import express, { Request, Response } from 'express';
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

function getBookById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
}

function getBooksByTitleStart(startTitle: string): Book[] {
    return books.filter((book) => book.title.toLowerCase().startsWith(startTitle.toLowerCase()));
}

function getAllBooks(): Book[] {
    return books;
}

function updateInsertBook(newBook: Book): { message: string; book: Book } {
    const existingBookIndex = findBookIndexById(newBook.id);

    if (existingBookIndex !== -1) {
        books[existingBookIndex] = { ...books[existingBookIndex], ...newBook };
        return { message: 'Book updated successfully', book: books[existingBookIndex] };
    } else {
        newBook.id = books.length + 1;
        books.push(newBook);
        return { message: 'Book created successfully', book: newBook };
    }
}

function findBookIndexById(bookId: number): number {
    return books.findIndex((book) => book.id === bookId);
}

interface Book {
    id: number
    title: string;
    author_name: string;
    description: string;
    groups: string[];
}

const books: Book[] = [
    {
        id: 1,
        title: 'To Kill a Mockingbird',
        author_name: 'Harper Lee',
        description: 'A novel about the serious issues of rape and racial inequality.',
        groups: ['Classics', 'Fiction']
    },
    {
        id: 2,
        title: '1984',
        author_name: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
        groups: ['Classics', 'Dystopian']
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author_name: 'F. Scott Fitzgerald',
        description: 'A novel about the American dream and the roaring twenties.',
        groups: ['Classics', 'Fiction']
    },
    {
        id: 4,
        title: 'The Catcher in the Rye',
        author_name: 'J.D. Salinger',
        description: 'A story about teenage rebellion and angst.',
        groups: ['Classics', 'Fiction']
    },
    {
        id: 5,
        title: 'Pride and Prejudice',
        author_name: 'Jane Austen',
        description: 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
        groups: ['Classics', 'Romance']
    },
    {
        id: 6,
        title: 'The Hobbit',
        author_name: 'J.R.R. Tolkien',
        description: 'A fantasy novel and children\'s book about the adventures of Bilbo Baggins.',
        groups: ['Fantasy', 'Adventure']
    },
    {
        id: 7,
        title: 'Moby Dick',
        author_name: 'Herman Melville',
        description: 'A novel about the voyage of the whaling ship Pequod.',
        groups: ['Classics', 'Adventure']
    },
    {
        id: 8,
        title: 'War and Peace',
        author_name: 'Leo Tolstoy',
        description: 'A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era.',
        groups: ['Classics', 'Historical']
    },
    {
        id: 9,
        title: 'The Odyssey',
        author_name: 'Homer',
        description: 'An epic poem about the journey of Odysseus.',
        groups: ['Classics', 'Epic']
    },
    {
        id: 10,
        title: 'Crime and Punishment',
        author_name: 'Fyodor Dostoevsky',
        description: 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student who kills a pawnbroker.',
        groups: ['Classics', 'Psychological']
    }
];