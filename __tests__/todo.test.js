const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const Todo = require("../server/models/todo");
const createServerUtils = require("../utils/createServer.utils");

const app = createServerUtils();

const notExistingData_id = "63384e21c2ad554e902eb708";

describe("todo list endpoints", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("getting all items", () => {
    const page = 1;
    const page_count = 5;
    it("should respond corectly", async () => {
      const { body, statusCode } = await request(app)
        .get(`/api/todo?page=${1}&page_count=${page_count}`)
        .expect(200);

      expect(statusCode).toEqual(200);
      expect(body.result.page).toEqual(page);
      expect(body.result.page_length).toBeLessThanOrEqual(page_count);
    });
  });

  describe("adding an item", () => {
    it("should respond corectly", async () => {
      const { body, statusCode } = await request(app).post("/api/todo").send({
        title: "test todo",
      });

      expect(statusCode).toEqual(201);
      expect(body.data.title).toEqual("test todo");
    });
  });

  describe("updating an item", () => {
    it("given the item is existing", async () => {
      const { _id } = await Todo.create({ title: "test todo" });
      const { body, statusCode } = await request(app).patch("/api/todo").send({
        id: _id,
        title: "test todo update",
      });

      expect(statusCode).toEqual(201);
      expect(body.data.title).toEqual("test todo update");
    });

    it("given the item is not existing", async () => {
      const { body, statusCode } = await request(app).patch("/api/todo").send({
        id: notExistingData_id,
        title: "test todo update",
      });

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual("data does not exist");
    });
  });

  describe("deleting an item", () => {
    it("given the item is existing", async () => {
      const { _id } = await Todo.create({ title: "test todo" });
      const { body, statusCode } = await request(app).delete(
        `/api/todo?id=${_id}`
      );

      expect(statusCode).toEqual(201);
      expect(body.message).toEqual("Success!");
    });

    it("given the item is not existing", async () => {
      const { body, statusCode } = await request(app).delete(
        `/api/todo?id=${notExistingData_id}`
      );

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual("data does not exist");
    });
  });
});
