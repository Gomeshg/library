import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import userRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import { privateKey } from "../utils/utils.js";

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(httpStatus.BAD_REQUEST);

  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const thereIsToken = await userRepository.findSession(token);

    if (thereIsToken) {
      const isValidToken = jwt.verify(token, privateKey);

      if (isValidToken) {
        res.locals.userId = thereIsToken.userId;
        next();
      }
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
