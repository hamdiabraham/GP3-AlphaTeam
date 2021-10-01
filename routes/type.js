const typeRouter = require("express").Router();
const typeController = require("../controllers/type");

typeRouter.post("/types", typeController.makeType);

module.exports = typeRouter;