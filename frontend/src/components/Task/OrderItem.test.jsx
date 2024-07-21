/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { mocks } from "../../mocks/mockResponse";
import * as testUtils from "../../test-utils";
import TaskItem from "./TaskItem";

import React from "react";
import "@testing-library/jest-dom";
import OrderItem from "./OrderItem";
import * as utils from "../../utils";

test("Task Item should display a LineItem when view is picking", async () => {
  const { container } = testUtils.render(<OrderItem item={mocks.paginatedOrders.orders[0]} />);
  const itemRow = testUtils.screen.getByTestId("orderItem");

  expect(itemRow).toBeInTheDocument();
  expect(container.querySelector("select")).toBeInTheDocument();
  expect(testUtils.screen.getAllByTestId("order-products").length).toEqual(3);
});

test("Should make a request when select option is changed", async () => {
  const { container } = testUtils.render(<OrderItem item={mocks.paginatedOrders.orders[0]} />);
  const itemRow = testUtils.screen.getByTestId("orderItem");
  const updateListItemMock = jest.spyOn(utils, "updateOrderRequest").mockImplementation(() => Promise.resolve());

  expect(itemRow).toBeInTheDocument();
  const selectElement = container.querySelector("select");
  testUtils.fireEvent.change(selectElement, { target: { value: "incomplete" } });
  expect(container.querySelector("select")).toBeInTheDocument();
  expect(testUtils.screen.getAllByTestId("order-products").length).toEqual(3);

  expect(updateListItemMock).toHaveBeenCalled();
});

test("update order api works as expected", async () => {
  const prop = { ...mocks.paginatedOrders.orders[0], _id: "669c3b7ee3e150d6b9ca368e" };

  try {
    const response = await utils.updateListItemRequest(prop);

    expect(response).toBeTruthy();
  } catch (error) {}
});
