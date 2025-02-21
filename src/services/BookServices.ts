import type { Book } from '../models/Book';
import { getAllBooks as allBooks, getBookById as bookById, 
    getBooksByTitleStart as booksByTitleStart, 
    updateInsertBook as upInBook } from '../repository/BookRepository';

export function getBookById(bookId: number): Promise<Book | undefined> {
    return bookById(bookId);
}

export function getBooksByTitleStart(startTitle: string): Promise<Book[]> {
    return booksByTitleStart(startTitle);
}

export function getAllBooks(): Promise<Book[]> {
    return allBooks();
}

export function updateInsertBook(newBook: Book): Promise<{ message: string; book: Book }> {
    return upInBook(newBook);
}