const authRouter = require("express").Router();
const authController = require("../controllers/auth");
const authorizations = require("../midllewares/authorization");

authRouter.post("/users/login", authController.login);

module.exports = authRouter;
