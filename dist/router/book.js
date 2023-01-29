import { Router } from "express";
// importar controllers
var route = Router();
route.get("/book", function (req, res) {
    return res.sendStatus(200);
});
// route.get("/book/all");
// route.post("/book");
// route.put("/book");
// route.delete("/book");
export default route;
