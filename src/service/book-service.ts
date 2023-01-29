import bookRepository from "../repository/book-repository.js";
import userRepository from "../repository/user-repository.js";
import {
  notFoundError,
  conflictError,
  unauthorizedError,
} from "../errors/errors.js";
import { Book, UpdatedBook, User } from "../protocols/types.js";

async function readBook(userId: number, bookID: number): Promise<Book> {
  const book = (await bookRepository.readBook(bookID)) as Book;

  if (!book) {
    throw notFoundError("book");
  }

  if (userId !== book.userId) {
    throw unauthorizedError();
  }

  const finalBook: Book = {
    ...book,
    progress:
      book.pages === 0
        ? "0%"
        : `${((book.pagesRead / book.pages) * 100).toFixed(1)}%`,
  };

  return finalBook;
}

async function readAllBook(userId: number): Promise<Book[]> {
  const allBooks = (await bookRepository.readAllBook(userId)) as Book[];

  const finalAllBooks: Book[] = [];
  for (let i = 0; i < allBooks.length; i++) {
    const book = {
      ...allBooks[i],
      progress:
        allBooks[i].pages === 0
          ? "0%"
          : `${((allBooks[i].pagesRead / allBooks[i].pages) * 100).toFixed(
              1
            )}%`,
    };
    finalAllBooks.push(book);
  }

  return finalAllBooks;
}

async function howManyBooksWereDone(
  userId: number
): Promise<{ booksDone: number }> {
  const count: number = await bookRepository.howManyBooksWereDone(userId);

  return { booksDone: count };
}

async function createBook(newBook: Book): Promise<void> {
  const nameAlreadyExists = (await bookRepository.readBookByName(
    newBook.name
  )) as Book;
  if (nameAlreadyExists) {
    throw conflictError();
  }

  await bookRepository.createBook(newBook);
}

async function updateBook(
  userId: number,
  bookId: number,
  updatedBook: UpdatedBook
): Promise<void> {
  const book = (await bookRepository.readBook(bookId)) as Book;
  if (!book) {
    throw notFoundError("book");
  }

  if (userId !== book.userId) {
    throw unauthorizedError();
  }

  if (updatedBook.name) {
    const nameAlreadyExists = (await bookRepository.readBookByName(
      updatedBook.name
    )) as Book;

    if (nameAlreadyExists && book.id !== nameAlreadyExists.id) {
      throw conflictError();
    }
  }

  await bookRepository.updateBook(bookId, updatedBook);
}
async function deleteBook(userId: number, bookId: number): Promise<void> {
  const book = (await bookRepository.readBook(bookId)) as Book;
  if (!book) {
    throw notFoundError("book");
  }

  if (userId !== book.userId) {
    throw unauthorizedError();
  }

  await bookRepository.deleteBook(bookId);
}

const bookService = {
  readBook,
  readAllBook,
  howManyBooksWereDone,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;
