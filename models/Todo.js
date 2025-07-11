import mongoose from 'mongoose';
const { Schema } = mongoose;


const todoSchema = new Schema({
  title: String,
  desc: String,
  date: String,
  time: String,
  status: { type: String, default: "Undo" },
});

export const Todo = mongoose.model('Todo', todoSchema);