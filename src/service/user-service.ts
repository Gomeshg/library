import userRepository from "../repository/user-repository.js";
import {
  notFoundError,
  conflictError,
  unauthorizedError,
} from "../errors/errors.js";
import { User, Session } from "../protocols/types.js";
import jwt from "jsonwebtoken";
import { privateKey, fourHours } from "../utils/utils.js";

export async function signUp(newUser: User): Promise<User> {
  const userAlreadyExists = await userRepository.findUser(newUser.email);
  if (userAlreadyExists) {
    throw conflictError();
  }

  const user = await userRepository.createUser(newUser);
  return user;
}

export async function signIn(user: User): Promise<Session> {
  const userExists = await userRepository.findUser(user.email);
  if (!userExists) {
    throw unauthorizedError();
  }

  if (user.password !== userExists.password) {
    throw unauthorizedError();
  }
  const newSession: Session = {
    token: jwt.sign({ userId: userExists.id }, privateKey, {
      expiresIn: fourHours,
    }),
    userId: userExists.id,
  };

  const session = await userRepository.createSession(newSession);
  return session;
}

const userService = {
  signUp,
  signIn,
};

export default userService;
