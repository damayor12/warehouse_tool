import { rest } from "msw";
import { mocks } from "./mockResponse";

export const baseUrl = `http://localhost:9001`;

export const handlers = [
  rest.get(`${baseUrl}/read/picking-list`, async (req, res, ctx) => {
    return res(ctx.json(mocks.lineItems));
  }),
  rest.get(`${baseUrl}/read/packing-list`, async (req, res, ctx) => {
    return res(ctx.json(mocks.paginatedOrders));
  }),

  rest.put(`${baseUrl}/update/picking-list`, async (req, res, ctx) => {
    return res(ctx.json(mocks.updatePickingListItem));
  }),

  rest.put(`${baseUrl}/update/packing-list/669c3b7ee3e150d6b9ca368e`, async (req, res, ctx) => {
    return res(ctx.json(mocks.updatePackingItem));
  }),
];
