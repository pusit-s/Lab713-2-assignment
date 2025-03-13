import type { Book } from '../models/Book';

export function getBookById(bookId: number): Promise<Book | undefined> {
    const booksById = books.find((book) => book.id === bookId)
    return Promise.resolve(booksById);
}

export function getBooksByTitleStart(startTitle: string): Promise<Book[]> {
    const filteredBooks = books.filter((book) => book.title.toLowerCase().startsWith(startTitle.toLowerCase()));
    return Promise.resolve(filteredBooks);
}

export function getAllBooks(): Promise<Book[]> {
    return Promise.resolve(books);
}

export function findBookIndexById(bookId: number): Promise<number> {
    const index = books.findIndex((book) => book.id === bookId);
    return Promise.resolve(index);
}

export function updateInsertBook(newBook: Book): Promise<{ message: string; book: Book }> {
    const existingBookIndex = books.findIndex((book) => book.id === newBook.id);

    if (existingBookIndex !== -1) {
        books[existingBookIndex] = { ...books[existingBookIndex], ...newBook };
        return Promise.resolve({ message: 'Book updated successfully', book: books[existingBookIndex] });
    } else {
        newBook.id = books.length + 1;
        books.push(newBook);
        return Promise.resolve({ message: 'Book created successfully', book: newBook });
    }
}

const books: Book[] = [
    {
        id: 1,
        title: 'To Kill a Mockingbird',
        author_name: 'Harper Lee',
        description: 'A novel about the serious issues of rape and racial inequality.',
        groups: 'Classics'
    },
    {
        id: 2,
        title: '1984',
        author_name: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
        groups: 'Dystopian'
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author_name: 'F. Scott Fitzgerald',
        description: 'A novel about the American dream and the roaring twenties.',
        groups: 'Classics'
    },
    {
        id: 4,
        title: 'The Catcher in the Rye',
        author_name: 'J.D. Salinger',
        description: 'A story about teenage rebellion and angst.',
        groups: 'Classics'
    },
    {
        id: 5,
        title: 'Pride and Prejudice',
        author_name: 'Jane Austen',
        description: 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
        groups: 'Romance'
    },
    {
        id: 6,
        title: 'The Hobbit',
        author_name: 'J.R.R. Tolkien',
        description: 'A fantasy novel and children\'s book about the adventures of Bilbo Baggins.',
        groups: 'Fantasy'
    },
    {
        id: 7,
        title: 'Moby Dick',
        author_name: 'Herman Melville',
        description: 'A novel about the voyage of the whaling ship Pequod.',
        groups: 'Adventure'
    },
    {
        id: 8,
        title: 'War and Peace',
        author_name: 'Leo Tolstoy',
        description: 'A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era.',
        groups: 'Historical'
    },
    {
        id: 9,
        title: 'The Odyssey',
        author_name: 'Homer',
        description: 'An epic poem about the journey of Odysseus.',
        groups: 'Epic'
    },
    {
        id: 10,
        title: 'Crime and Punishment',
        author_name: 'Fyodor Dostoevsky',
        description: 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student who kills a pawnbroker.',
        groups: 'Psychological'
    }
];