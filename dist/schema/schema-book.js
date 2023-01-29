import joi from "joi";
var book = joi.object({
    name: joi.string().max(50).required(),
    image: joi.string().uri(),
    gender: joi.string().max(50).required(),
    author: joi.string().max(50),
    pages: joi.number().integer().min(0),
    pagesRead: joi.number().integer().min(0),
    status: joi.string().valid("NotStarted", "InProgress", "Done"),
    summary: joi.string()
});
var updatedBook = joi.object({
    name: joi.string().max(50),
    image: joi.string().uri(),
    gender: joi.string().max(50),
    author: joi.string().max(50),
    pages: joi.number().integer().min(0),
    pagesRead: joi.number().integer().min(0),
    status: joi.string().valid("NotStarted", "InProgress", "Done"),
    summary: joi.string()
});
var schema = {
    book: book,
    updatedBook: updatedBook
};
export default schema;
