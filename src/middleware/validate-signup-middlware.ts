import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { signupSchema } from "../schema/schema-user.js";

export default async function validateSignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(error.details.map((item) => item.message));
  }
  next();
}
