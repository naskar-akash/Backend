const express = require("express");
const app = express();
const port = 3000;

app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })
  .post("/", (req, res) => {
    console.log(res.body);
    res.send("Hello World!");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
