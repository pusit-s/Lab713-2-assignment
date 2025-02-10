import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library!');
    });

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    });

app.get('/books', (req: Request, res: Response) => {
    res.json(books);
    });

interface Event {
    title: string;
    author_name: string;
    description: string;
    groups: string[];
}

const books: Event[] = [
    {
        title: 'To Kill a Mockingbird',
        author_name: 'Harper Lee',
        description: 'A novel about the serious issues of rape and racial inequality.',
        groups: ['Classics', 'Fiction']
    },
    {
        title: '1984',
        author_name: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
        groups: ['Classics', 'Dystopian']
    },
    {
        title: 'The Great Gatsby',
        author_name: 'F. Scott Fitzgerald',
        description: 'A novel about the American dream and the roaring twenties.',
        groups: ['Classics', 'Fiction']
    },
    {
        title: 'The Catcher in the Rye',
        author_name: 'J.D. Salinger',
        description: 'A story about teenage rebellion and angst.',
        groups: ['Classics', 'Fiction']
    },
    {
        title: 'Pride and Prejudice',
        author_name: 'Jane Austen',
        description: 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
        groups: ['Classics', 'Romance']
    },
    {
        title: 'The Hobbit',
        author_name: 'J.R.R. Tolkien',
        description: 'A fantasy novel and children\'s book about the adventures of Bilbo Baggins.',
        groups: ['Fantasy', 'Adventure']
    },
    {
        title: 'Moby Dick',
        author_name: 'Herman Melville',
        description: 'A novel about the voyage of the whaling ship Pequod.',
        groups: ['Classics', 'Adventure']
    },
    {
        title: 'War and Peace',
        author_name: 'Leo Tolstoy',
        description: 'A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era.',
        groups: ['Classics', 'Historical']
    },
    {
        title: 'The Odyssey',
        author_name: 'Homer',
        description: 'An epic poem about the journey of Odysseus.',
        groups: ['Classics', 'Epic']
    },
    {
        title: 'Crime and Punishment',
        author_name: 'Fyodor Dostoevsky',
        description: 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student who kills a pawnbroker.',
        groups: ['Classics', 'Psychological']
    }
];