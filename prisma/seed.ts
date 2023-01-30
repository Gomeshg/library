import bcrypt from "bcrypt";
import prisma from "../src/database/prisma.js";
import { User, Book } from "../src/protocols/types.js";

async function main() {
  const passwordHashed = await bcrypt.hash("123456", 12);

  const newUser: User = {
    email: "teste123@gmail.com",
    password: passwordHashed,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  const newBooks: Book[] = [
    {
      name: "Como fazer inimigos e incomodar pessoas",
      gender: "Comunicação",
      pages: 350,
      pagesRead: 300,
      userId: user.id,
    },
    {
      name: "João e maria",
      gender: "Ficção",
      pages: 250,
      pagesRead: 57,
      userId: user.id,
    },
    {
      name: "Alcorão",
      gender: "Religiosidade",
      pages: 900,
      userId: user.id,
    },
  ];

  await prisma.book.createMany({
    data: newBooks,
  });
}

main()
  .then(() => {
    console.log("Banco preenchido com sucesso!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
