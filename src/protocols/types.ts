export type ApplicationError = {
  name: string;
  message: string;
};

type Status = "NotStarted" | "InProgress" | "Done";

export type Book = {
  id?: number;
  name: string;
  gender: string;
  author?: string | null;
  image?: string | null;
  pages?: number;
  pagesRead?: number;
  status?: Status;
  summary?: string | null;
  progress?: string;
  createdAt?: Date;
  userId: number;
};

export type UpdatedBook = {
  name?: string;
  gender?: string;
  author?: string;
  imagem?: string;
  pages?: number;
  pagesRead?: number;
  status?: Status;
  summary?: string;
};

export type User = {
  id?: number;
  email: string;
  password: string;
  createdAt?: Date;
};

export type Session = {
  id?: number;
  token: string;
  userId: number;
  acessDate?: Date;
};
