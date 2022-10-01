const mongoose = require("mongoose");
const createServerUtils = require("../utils/createServer.utils");
require("dotenv").config();

const app = createServerUtils();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on post ${process.env.SERVER_PORT}`);

  //database
  mongoose.connect(process.env.DATABASE_URL);
  mongoose.connection.on("connected", () => console.log("database connected"));
});
