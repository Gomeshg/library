import prisma from "../database/prisma.js";
import { User, Session } from "../protocols/types.js";

async function createUser(newUser: User): Promise<User> {
  return prisma.user.create({
    data: newUser,
  });
}

async function findUser(id: number): Promise<User> {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function createSession(
  userId: number,
  newSession: Session
): Promise<Session> {
  return prisma.session.upsert({
    where: {
      userId,
    },
    create: newSession,
    update: {
      token: newSession.token,
      acessDate: new Date().toISOString(),
    },
  });
}

async function findSession(token: string) {
  return prisma.session.findUnique({
    where: {
      token,
    },
  });
}

const userRepository = {
  createUser,
  findUser,
  createSession,
  findSession,
};

export default userRepository;
