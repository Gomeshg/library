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

const router = Router();

router.get("/book/all", getAllBook);
router.get("/book/done", howManyBooksWereDone);
router.get("/book/:id", validateParams, getBook);
router.post("/book", validateBook, postBook);
router.put("/book/:id", validateParams, validateUpdatedBook, updateBook);
router.delete("/book/:id", validateParams, deleteBook);

export default router;
