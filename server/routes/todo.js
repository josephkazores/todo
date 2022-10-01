const express = require("express");
const router = express.Router();

const validationMiddleware = require("../middleware/validation");
const todoValidation = require("../validation/todo");

const todoController = require("../controller/todoController");

router.get(
  "/",
  todoValidation.getList,
  validationMiddleware,
  todoController.getList
);
router.post(
  "/",
  todoValidation.addTodo,
  validationMiddleware,
  todoController.addTodo
);
router.patch(
  "/",
  todoValidation.updateTodo,
  validationMiddleware,
  todoController.updateTodo
);
router.delete(
  "/",
  todoValidation.deleteTodo,
  validationMiddleware,
  todoController.deleteTodo
);

module.exports = router;
