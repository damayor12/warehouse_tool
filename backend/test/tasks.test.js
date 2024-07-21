const request = require("supertest");

const createServer = require("../src/app").default;
const { default: TasksService } = require("../src/services/tasks-service");
const { order, task } = require("./mocks");
require("@jest/globals");

test("add", () => {
  expect(1 + 2).toBe(3);
});

const app = createServer();

describe("POST Tasks", () => {
  test("should have key record and msg when picking list is updated", async () => {
    const mockCreatedTask = jest.fn(() => task);
    jest.spyOn(TasksService, "updatePickingListItem").mockImplementation(() => mockCreatedTask());
    const res = await request(app)
      .put("/update/picking-list")
      .send({ updateStatus: "completed", itemIds: ["74d02cac-7dfb-4bae-b7e1-84762a7d2ea6"] });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body["msg"]).toEqual("Successfully updated");
    expect(mockCreatedTask).toHaveBeenCalled();
  });

  test("request should handle exceptions", async () => {
    const mockCreatedTask = jest.fn(() => {
      throw new Error("Couldnt update Task");
    });
    jest.spyOn(TasksService, "updatePickingListItem").mockImplementation(() => mockCreatedTask());
    const res = await request(app)
      .put("/update/picking-list")
      .send({ updateStatus: "completed", itemIds: ["74d02cac-7dfb-4bae-b7e1-84762a7d2ea6"] });

    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg.includes("error")).toBe(true);
    expect(mockCreatedTask).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
  });
});

describe("GET ListItems", () => {
  test("should return all listitems", async () => {
    const mockFetchedOrders = jest.fn(() => order);

    jest.spyOn(TasksService, "getAllOrders").mockImplementation(() => mockFetchedOrders());

    const res = await request(app).get("/read/picking-list");

    expect(Array.isArray(res.body)).toBe(true);
    expect(mockFetchedOrders).toHaveBeenCalled();
    expect(res.body[0].name).toEqual("Valentines Box");
  });

  test("should return all orders", async () => {
    jest.clearAllMocks();
    const mockFetchedOrdersPaginated = jest.fn(() => ({
      orders: order,
      totalPages: 1,
      currentPage: 1,
    }));

    jest.spyOn(TasksService, "getAllOrdersPaginated").mockImplementation(() => mockFetchedOrdersPaginated());

    const res = await request(app).get("/read/packing-list/?page=1&limit=1");

    expect(Array.isArray(res.body)).toBe(false);
    expect(mockFetchedOrdersPaginated).toHaveBeenCalled();
    expect(res.body).toHaveProperty("orders");
    expect(Array.isArray(res.body.orders)).toBe(true);
  });

  test("test params validation", async () => {
    jest.clearAllMocks();
    const mockFetchedOrdersPaginated = jest.fn(() => ({
      orders: order,
      totalPages: 1,
      currentPage: 1,
      count: 1,
      pending: 0,
    }));

    jest.spyOn(TasksService, "getAllOrdersPaginated").mockImplementation(() => mockFetchedOrdersPaginated());

    const res = await request(app).get("/read/packing-list/?page=WRONG&limit=FALSE");

    expect(Array.isArray(res.body)).toBe(false);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors[0].msg).toEqual("limit should be integer between 1 and 10");
  });
});
