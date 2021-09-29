const authRouter = require("express").Router();
const authController = require("../controllers/auth");

authRouter.post("/users/login", authController.login);

module.exports = authRouter;
