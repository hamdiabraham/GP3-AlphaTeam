const authRouter = require("express").Router();
const authController = require("../controllers/auth");
const authorization = require("../midllewares/authorization");

authRouter.post("/users/login", authController.login);
authRouter.get("/users", authorization.register);

module.exports = authRouter;
