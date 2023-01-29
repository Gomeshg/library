import joi, { ObjectSchema } from "joi";
import { Book, UpdatedBook } from "../protocols/types";

const book: ObjectSchema<Book> = joi.object({
  name: joi.string().max(50).required(),
  image: joi.string().uri(),
  gender: joi.string().max(50).required(),
  author: joi.string().max(50),
  pages: joi.number().integer().min(0),
  pagesRead: joi.number().integer().min(0),
  status: joi.string().valid("NotStarted", "InProgress", "Done"),
  summary: joi.string(),
});

const updatedBook: ObjectSchema<UpdatedBook> = joi.object({
  name: joi.string().max(50),
  image: joi.string().uri(),
  gender: joi.string().max(50),
  author: joi.string().max(50),
  pages: joi.number().integer().min(0),
  pagesRead: joi.number().integer().min(0),
  status: joi.string().valid("NotStarted", "InProgress", "Done"),
  summary: joi.string(),
});

const schema = {
  book,
  updatedBook,
};
export default schema;
