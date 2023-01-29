import { Router } from "express";
import validateUser from "../middleware/validate-user-middleware.js";

import { signIn, signUp } from "../controller/user-controller.js";

const userRouter = Router();

userRouter
  .post("/sign-up", validateUser, signUp)
  .post("/sign-in", validateUser, signIn);

export default userRouter;
