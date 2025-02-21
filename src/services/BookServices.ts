import type { Book } from '../models/Book';
import * as repo from '../repository/BookRepository';

export function getBookById(bookId: number): Promise<Book | undefined> {
    return repo.getBookById(bookId);
}

export function getBooksByTitleStart(startTitle: string): Promise<Book[]> {
    return repo.getBooksByTitleStart(startTitle);
}

export function getAllBooks(): Promise<Book[]> {
    return repo.getAllBooks();
}

export function updateInsertBook(newBook: Book): Promise<{ message: string; book: Book }> {
    return repo.updateInsertBook(newBook);
}