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
import authentication from "../middleware/authentication-middleware.js";

const bookRouter = Router();

bookRouter.get("/book/all", authentication, getAllBook);
bookRouter.get("/book/done", authentication, howManyBooksWereDone);
bookRouter.get("/book/:id", authentication, validateParams, getBook);
bookRouter.post("/book", authentication, validateBook, postBook);
bookRouter.put(
  "/book/:id",
  authentication,
  validateParams,
  validateUpdatedBook,
  updateBook
);
bookRouter.delete("/book/:id", authentication, validateParams, deleteBook);

export default bookRouter;
