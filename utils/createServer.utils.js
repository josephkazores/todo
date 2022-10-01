const express = require("express");
const morgan = require("morgan");

module.exports = createServer = () => {
  const app = express();
  const router = express.Router();

  //middlewares
  app.use(express.json());
  app.use(morgan("dev"));

  //routes
  router.use("/todo", require("../server/routes/todo"));

  app.use("/api", router);

  return app;
};
