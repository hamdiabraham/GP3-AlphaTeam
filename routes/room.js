const roomRouter = require("express").Router();
const roomController = require("../controllers/room");

roomRouter.post("/room", roomController.makeRoom);
roomRouter.get("/room", roomController.readAll);
roomRouter.get("/room/:id", roomController.readById);
roomRouter.patch("/room/:id", roomController.updateRoom);
roomRouter.delete("/room/:id", roomController.deleteRoom);

module.exports = roomRouter;
