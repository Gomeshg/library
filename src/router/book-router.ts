import { Router } from "express";
import {
  getBook,
  getAllBook,
  postBook,
  updateBook,
  deleteBook,
  howManyBooksWereDone,
} from "../controller/book-controller.js";
import validateBook from "../middleware/validate-book-middleware.js";
import validateUpdatedBook from "../middleware/validate-updatedbook-middleware.js";
import validateParams from "../middleware/validate-params-middleware.js";

const bookRouter = Router();

bookRouter.get("/book/all", getAllBook);
bookRouter.get("/book/done", howManyBooksWereDone);
bookRouter.get("/book/:id", validateParams, getBook);
bookRouter.post("/book", validateBook, postBook);
bookRouter.put("/book/:id", validateParams, validateUpdatedBook, updateBook);
bookRouter.delete("/book/:id", validateParams, deleteBook);

export default bookRouter;
