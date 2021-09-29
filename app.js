const mainRouter = require("./routes")

const express = require("express");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use (mainRouter);

app.listen(port, () => console.log(`Running server on port ${port}`));
