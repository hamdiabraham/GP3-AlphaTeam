const mainRouter = require("express").Router();
const authRouter = require("./auth");
const reservationRouter = require("./reservation");

mainRouter.use(authRouter);
mainRouter.use(reservationRouter);

module.exports = mainRouter;
