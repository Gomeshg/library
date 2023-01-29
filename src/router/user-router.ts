import { Router } from "express";
import validateSignIn from "../middleware/validate-signin-middleware.js";
import validateSignUp from "../middleware/validate-signup-middlware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSignUp).post("/sign-in", validateSignIn);

export default userRouter;
