const authRouter = require("express").Router();
const authController = require("../controllers/auth");

authRouter.post("/users/login", authController.login);
authRouter.post("/users/register", authController.register);

module.exports = authRouter;
