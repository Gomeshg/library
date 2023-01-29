import { join } from "@prisma/client/runtime";
import joi from "joi";

export const signupSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
