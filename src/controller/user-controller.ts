import { Request, Response } from "express";
import httpStatus from "http-status";
import { User, Session } from "../protocols/types.js";
import userService from "../service/user-service.js";

export async function signUp(req: Request, res: Response) {
  const newUser = req.body as User;

  try {
    await userService.signUp(newUser);
    return res
      .status(httpStatus.CREATED)
      .send({ feedback: "Successful Registration!" });
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signIn(req: Request, res: Response) {
  const user = req.body as User;

  try {
    const session = await userService.signIn(user);
    return res
      .status(httpStatus.OK)
      .send({ token: session.token, feedback: "Successful login!" });
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
