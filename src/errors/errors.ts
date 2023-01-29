import { ApplicationError } from "../protocols/types";

export function notFoundError(entity: string): ApplicationError {
  return { name: "NotFoundError", message: `${entity} not found` };
}

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: `No authorization to access this`,
  };
}

export function conflictError(): ApplicationError {
  return { name: "ConflictError", message: "This name already exists" };
}
