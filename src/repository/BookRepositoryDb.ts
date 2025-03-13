import type { Book } from '../models/Book';
import connection from '../db';

export async function getBookById(bookId: number): Promise<Book | undefined> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [bookId]);
    const book = rows as Book[];
    return book.length ? book[0] : undefined;
}

export async function getBooksByTitleStart(startTitle: string): Promise<Book[]> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE title LIKE ?', [`${startTitle}%`]);
    return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
    const [rows] = await connection.execute('SELECT * FROM books');
    return rows as Book[];
}

export async function findBookIndexById(bookId: number): Promise<number> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [bookId]);
    const books = rows as Book[];
    return books.length ? 0 : -1;
}

export async function updateInsertBook(newBook: Book): Promise<{ message: string; book: Book }> {
    const {id, title, author_name, description, groups} = newBook;
    const existingBookIndex = await findBookIndexById(id);

    if (existingBookIndex !== -1) {
        await connection.execute('UPDATE books SET title = ?, author_name = ?, description = ?, `groups` = ? WHERE id = ?',[title, author_name, description, groups, id]);
        return { message: 'Book updated successfully', book: newBook };
    } else {
        await connection.execute(
            'INSERT INTO books (title, author_name, description, `groups`) VALUES (?, ?, ?, ?)',
            [title, author_name, description, groups]);
        return { message: 'Book created successfully', book: newBook };
    }
}