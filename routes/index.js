const authRouter = require("./auth");

const mainRouter = require("express").Router();

mainRouter.use(authRouter);

module.exports = mainRouter;