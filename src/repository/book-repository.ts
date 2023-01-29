import prisma from "../database/prisma.js";
import { Book, UpdatedBook } from "../protocols/types.js";

async function readBook(bookID: number): Promise<Book> {
  return prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });
}

async function readBookByName(bookName: string): Promise<Book> {
  return prisma.book.findFirst({
    where: {
      name: bookName,
    },
  });
}

async function readAllBook(userId: number): Promise<Book[]> {
  return prisma.book.findMany({
    where: {
      userId,
    },
  });
}

async function createBook(newBook: Book): Promise<Book> {
  return prisma.book.create({
    data: newBook,
  });
}

async function updateBook(
  bookID: number,
  updatedBook: UpdatedBook
): Promise<Book> {
  return prisma.book.update({
    where: {
      id: bookID,
    },
    data: updatedBook,
  });
}

async function deleteBook(bookID: number): Promise<Book> {
  return prisma.book.delete({
    where: {
      id: bookID,
    },
  });
}

async function howManyBooksWereDone(userId: number): Promise<number> {
  return prisma.book.count({
    where: {
      status: "Done",
      userId,
    },
  });
}

const bookRepository = {
  readBook,
  readBookByName,
  readAllBook,
  createBook,
  updateBook,
  deleteBook,
  howManyBooksWereDone,
};

export default bookRepository;
