const authRouter = require("./auth");
const authentication = require("../middlewares/authentication");
const mainRouter = require("express").Router();
const typeRouter = require("./type");
const reservationRouter = require("./reservation");

mainRouter.use(authRouter);
mainRouter.use(typeRouter);
// mainRouter.use(authentication);
mainRouter.use(reservationRouter);

module.exports = mainRouter;
