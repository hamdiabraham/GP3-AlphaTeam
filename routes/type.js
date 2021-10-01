const typeRouter = require("express").Router();
const typeController = require("../controllers/type");

typeRouter.post("/type-room", typeController.makeType);
typeRouter.get("/type-room", typeController.readAll);
typeRouter.get("/type-room/:id", typeController.readById);
typeRouter.patch("/type-room/:id", typeController.updateType);
typeRouter.delete("/type-room/:id", typeController.deleteType);

module.exports = typeRouter;