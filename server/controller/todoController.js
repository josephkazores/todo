const Todo = require("../models/todo");

exports.getList = async (req, res) => {
  const { page, page_count } = req.query;
  try {
    const count = await Todo.count();
    const result = await Todo.aggregate([
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          status: 1,
        },
      },
      {
        $skip: (parseInt(page) - 1) * parseInt(page_count) || 0,
      },
      {
        $limit: parseInt(page_count) || 10,
      },
    ]);

    res.status(200).send({
      message: "Success!",
      result: {
        data: result,
        page: parseInt(page),
        page_length: result.length,
        total_pages: Math.ceil(count / page_count),
        total_data: count,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const data = await Todo.create(req.body);
    const result = await Todo.findOne({ _id: data._id })
      .select("title")
      .select("content")
      .select("status");

    res.status(201).send({
      message: "Success!",
      data: result,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateTodo = async (req, res) => {
  const { id, ...rest } = req.body;
  const test = await Todo.findOne({ _id: id });
  if (!test) {
    return res.status(404).send({
      message: "data does not exist",
    });
  }

  try {
    await Todo.findByIdAndUpdate(id, { ...rest });
    const result = await Todo.findOne({ _id: id })
      .select("title")
      .select("content")
      .select("status");

    res.status(201).send({
      message: "Success!",
      data: result,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.query;
  const test = await Todo.findOne({ _id: id });
  if (!test) {
    return res.status(404).send({
      message: "data does not exist",
    });
  }

  try {
    await Todo.findByIdAndDelete(id);
    res.status(201).send({
      message: "Success!",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
