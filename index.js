import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { Todo } from "./models/Todo.js";

// To connect mongo Db
await mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((err) => {
    console.error("Mongodb connection error", err);
  });
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get request to get back all the todos' list at localhost:3000
app.get("/todos", async (req, res) => {
  try {
    let todos = await Todo.find({});
    res.status(201).json({ message: "Getting Todos!", todos });
  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
});

// post request to store the todos into mongodb://localhost:27017/todo
app.post("/todos", async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    const todo = new Todo({ title, desc });
    await todo.save();
    res.status(201).json({ message: "Todo created!", todo });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

//  Put request for updating todos
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    todo.title = title;
    todo.desc = desc;

    await todo.save();
    res.status(200).json({message: "Todo updated!", todo})
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Delete request for deleting todos
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    await todo.deleteOne();
    res.status(200).json({message: "Todo deleted!", todo})
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error:error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
