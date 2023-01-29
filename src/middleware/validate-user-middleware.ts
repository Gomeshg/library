import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { userSchema } from "../schema/schema-user.js";

export default async function validateSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(error.details.map((item) => item.message));
  }
  next();
}
