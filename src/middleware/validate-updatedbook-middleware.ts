import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import schema from "../schema/schema-book.js";
import { ValidationError } from "joi";

export default async function validateUpdatedBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = schema.updatedBook.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(error.details.map((item) => item.message));
  }
  next();
}
