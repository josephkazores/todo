const { check } = require("express-validator");

exports.getList = [
  check("page")
    .isNumeric()
    .withMessage("must be an Integer")
    .not()
    .isIn([0])
    .withMessage("must be a whole number"),
  check("page_count").isNumeric().withMessage("must be an Integer"),
];

exports.addTodo = [
  check("title").isString().withMessage("must be a String"),
  check("content").isString().withMessage("must be a String").optional(),
  check("status")
    .isIn([0, 1, 2])
    .withMessage("value must be either 0, 1 or 2")
    .optional(),
];

exports.updateTodo = [
  check("id").isMongoId().withMessage("must be a valid MongoId"),
  check("title").isString().withMessage("must be a String").optional(),
  check("content").isString().withMessage("must be a String").optional(),
  check("status")
    .isIn([0, 1, 2])
    .withMessage("value must be either 0, 1 or 2")
    .optional(),
];

exports.deleteTodo = [
  check("id").isMongoId().withMessage("must be a valid MongoId"),
];
