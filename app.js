const mainRouter = require("./routes");
const express = require("express");
const app = express();
const port = 5000;
const handlerError = require("./middlewares/handlerError");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(mainRouter);

app.use(handlerError);

app.listen(port, () => console.log(`Running server on port ${port}`));
