const authRouter = require("./auth");
const authentication = require("../midllewares/authentication");
const mainRouter = require("express").Router();
const typeRouter = require("./type");


mainRouter.use(authRouter);
mainRouter.use(typeRouter);
// mainRouter.use(authentication);

module.exports = mainRouter;
