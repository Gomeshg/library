import httpStatus from "http-status";
export default function handleApplicationErrors(err, req, res) {
    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message
        });
    }
    if (err.name === "BadRequestError") {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: err.message
        });
    }
    if (err.name === "ConflictError") {
        return res.status(httpStatus.CONFLICT).send({
            message: err.message
        });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error"
    });
}
