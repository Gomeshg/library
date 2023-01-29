import { Router } from "express";
import validateSignIn from "../middleware/validate-signin-middleware.js";
import validateSignUp from "../middleware/validate-signup-middlware.js";

import { signIn, signUp } from "../controller/user-controller.js";

const userRouter = Router();

userRouter
  .post("/sign-up", validateSignUp, signUp)
  .post("/sign-in", validateSignIn, signIn);

export default userRouter;
