const typeRouter = require("express").Router();
const typeController = require("../controllers/type");

typeRouter.post("/type-room", typeController.makeType);

module.exports = typeRouter;
