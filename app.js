require("dotenv").config();

const mainRouter = require("./routes");
const express = require("express");
const app = express();
const handlerError = require("./middlewares/handlerError");
const port = process.env.SERVER_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(mainRouter);

app.use(handlerError);

app.listen(port, () => console.log(`Running server on port ${port}`));
