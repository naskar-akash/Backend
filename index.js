import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { Todo } from './models/Todo.js';

let conn = await mongoose.connect("mongodb://localhost:27017/todo")
const app = express();
const port = 3000;

//middlewares
app.use(cors())
app.use(express())

app
  .get("/", (req, res) => {
    const todo = new Todo({title:"First Todo",desc:"Todo Description",isDone:false})
    todo.save()
    res.send("Hello World!");
  })
  .post("/", (req, res) => {
    console.log(res.body);
    res.send("Hello World!");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
