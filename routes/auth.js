const authRouter = require("express").Router();
const authController = require("../controllers/auth")

authRouter.post("/users/login");

module.exports = authRouter;