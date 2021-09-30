const mainRouter = require("./router");
const express = require("express");
const app = express();
port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mainRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
