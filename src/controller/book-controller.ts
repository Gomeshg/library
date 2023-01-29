import { Request, Response } from "express";
import httpStatus from "http-status";
import { Book, UpdatedBook } from "../protocols/types";
import bookService from "../service/book-service.js";

export async function getBook(req: Request, res: Response) {
  const id: number = res.locals.id;

  try {
    const book = (await bookService.readBook(id)) as Book;
    return res.status(httpStatus.OK).send(book);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllBook(req: Request, res: Response) {
  try {
    const allBooks = (await bookService.readAllBook()) as Book[];
    return res.status(httpStatus.OK).send(allBooks);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postBook(req: Request, res: Response) {
  const newBook = req.body as Book;

  try {
    await bookService.createBook(newBook);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateBook(req: Request, res: Response) {
  const id: number = res.locals.id;
  const updatedBook = req.body as UpdatedBook;

  try {
    await bookService.updateBook(id, updatedBook);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteBook(req: Request, res: Response) {
  const id: number = res.locals.id;

  try {
    await bookService.deleteBook(id);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function howManyBooksWereDone(req: Request, res: Response) {
  try {
    const booksDone: { booksDone: number } =
      await bookService.howManyBooksWereDone();
    return res.status(httpStatus.OK).send(booksDone);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
