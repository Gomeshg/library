import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import schema from "../schema/schema-book.js";

export default async function validateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = schema.book.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(error.details.map((item) => item.message));
  }
  next();
}
