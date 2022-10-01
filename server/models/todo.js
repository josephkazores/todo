const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 0, // 0 - todo, 1 - inprogress,  2 - done
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema, "todo");
module.exports = Todo;
