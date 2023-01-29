import { Request, Response } from "express";
import httpStatus from "http-status";
import { User, Session } from "../protocols/types";
import bookService from "../service/book-service.js";

export function signUp(req: Request, res: Response) {
  const newUser = req.body as User;

  try {
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export function signIn(req: Request, res: Response) {
  const user = req.body as User;

  try {
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
