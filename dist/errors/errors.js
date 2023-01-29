export function notFoundError(entity) {
    return { name: "NotFoundError", message: "".concat(entity, " not found") };
}
export function conflictError() {
    return { name: "ConflictError", message: "This name already exists" };
}
