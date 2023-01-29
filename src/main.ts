import express, { Express, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/book-router.js";
import handleApplicationErrors from "./errors/handle-application-errors.js";

dotenv.config();
const server: Express = express();

server.use(cors()).use(json()).use(router);
// .use(handleApplicationErrors);

server.listen(process.env.PORT, async () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
