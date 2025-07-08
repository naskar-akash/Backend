import express from 'express'
import cors from 'cors'
const app = express();
const port = 3000;

//middlewares
app.use(cors())
app.use(express())

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
