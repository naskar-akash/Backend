import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./models/Todo.js";

await mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((err) => {
    console.error("Mongodb connection error".err);
  });
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  })


  app.get("/todos", async (req, res) => {
    try {
      let todos = await Todo.find({})
      res.status(201).json({message:"Getting Todos!"})
      res.json(todos)
      res.status(201).json({message:"Finished!"})
    } catch (error) {
      res.status(500).json({error:"Failed to create todo"})
    }
  })

  app.post("/todos", async (req, res) => {
    try {
      const {title, desc} = req.body
    if (!title || !desc) {
      return res.status(400).json({error: "Title and description are required"})
    }
    const todo = new Todo({title,desc})
    await todo.save()
    res.status(201).json({message: "Todo created!", todo})
    } catch (error) {
      res.status(500).json({error:"Failed to create todo"})
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
