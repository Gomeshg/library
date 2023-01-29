import { Request, Response } from "express";
import httpStatus from "http-status";
import { Book, UpdatedBook } from "../protocols/types";
import bookService from "../service/book-service.js";

export async function getBook(req: Request, res: Response) {
  const bookId: number = res.locals.bookId;
  const userId: number = res.locals.userId;

  try {
    const book = (await bookService.readBook(userId, bookId)) as Book;
    return res.status(httpStatus.OK).send(book);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllBook(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const allBooks = (await bookService.readAllBook(userId)) as Book[];
    return res.status(httpStatus.OK).send(allBooks);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postBook(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newBook = req.body as Book;

  try {
    await bookService.createBook(userId, newBook);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateBook(req: Request, res: Response) {
  const bookId: number = res.locals.bookId;
  const userId: number = res.locals.userId;
  const updatedBook = req.body as UpdatedBook;

  try {
    await bookService.updateBook(userId, bookId, updatedBook);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteBook(req: Request, res: Response) {
  const bookId: number = res.locals.bookId;
  const userId: number = res.locals.userId;

  try {
    await bookService.deleteBook(userId, bookId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function howManyBooksWereDone(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const booksDone: { booksDone: number } =
      await bookService.howManyBooksWereDone(userId);
    return res.status(httpStatus.OK).send(booksDone);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
