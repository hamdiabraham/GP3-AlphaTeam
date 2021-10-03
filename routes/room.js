const roomRouter = require("express").Router();
const roomController = require("../controllers/room");

roomRouter.post("/room", roomController.chooseRoom);
