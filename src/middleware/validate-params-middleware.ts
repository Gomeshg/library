import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export default async function validateParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  if (!id) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  res.locals.id = id;
  next();
}
