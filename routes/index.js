const authRouter = require("./auth");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const mainRouter = require("express").Router();
const typeRouter = require("./type");
const reservationRouter = require("./reservation");
const roomRouter = require("./room");

mainRouter.use(authRouter);
mainRouter.use(authentication);
mainRouter.use(authorization);
mainRouter.use(typeRouter);
mainRouter.use(reservationRouter);
mainRouter.use(roomRouter);

module.exports = mainRouter;
