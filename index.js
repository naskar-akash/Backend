import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { Todo } from "./models/Todo.js";
import { dateTime } from "./dateTime.js";

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
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

//Get request to get a todo by id at localhost:3000
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let todos = await Todo.findById(id);
    res.status(201).json({ message: "Getting Todos!", todos });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// post request to store the todos into mongodb://localhost:27017/todo
app.post("/todos", async (req, res) => {
  const {date,time} = dateTime();
  try {
    const { title, desc, status } = req.body;
    if (!title || !desc) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const todo = new Todo({ title, desc, date, time, status });
    await todo.save();
    res.status(201).json({ message: "Todo created!", todo });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

//  Put request for updating todos
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, desc, status } = req.body;
  const {date,time} = dateTime();
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    todo.title = title;
    todo.desc = desc;
    todo.title = date;
    todo.time = time;
    todo.status = status;

    await todo.save();
    res.status(200).json({ message: "Todo updated!", todo });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
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
    res.status(200).json({ message: "Todo deleted!", todo });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
