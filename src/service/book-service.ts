import bookRepository from "../repository/book-repository.js";
import { notFoundError, conflictError } from "../errors/errors.js";
import { Book, UpdatedBook } from "../protocols/types.js";

async function readBook(bookID: number): Promise<Book> {
  const book = (await bookRepository.readBook(bookID)) as Book;

  if (!book) {
    throw notFoundError("book");
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

async function readAllBook(): Promise<Book[]> {
  const allBooks = (await bookRepository.readAllBook()) as Book[];

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

async function howManyBooksWereDone(): Promise<{ booksDone: number }> {
  const count: number = await bookRepository.howManyBooksWereDone();

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
  bookID: number,
  updatedBook: UpdatedBook
): Promise<void> {
  const book = (await bookRepository.readBook(bookID)) as Book;
  if (!book) {
    throw notFoundError("book");
  }

  if (updatedBook.name) {
    const nameAlreadyExists = (await bookRepository.readBookByName(
      updatedBook.name
    )) as Book;

    if (nameAlreadyExists && book.id !== nameAlreadyExists.id) {
      throw conflictError();
    }
  }

  await bookRepository.updateBook(bookID, updatedBook);
}
async function deleteBook(bookID: number): Promise<void> {
  const book = (await bookRepository.readBook(bookID)) as Book;
  if (!book) {
    throw notFoundError("book");
  }

  await bookRepository.deleteBook(bookID);
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
