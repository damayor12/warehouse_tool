import { Request, Response } from "express";

import asyncHandler from "express-async-handler";
import TasksService from "../services/tasks-service";

class WarehouseController {
  getPickingList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      let orders = await TasksService.getAllOrders();

      const lineItems = orders.map((item: any) => item.lineItems).flat();

      res.status(200).json(lineItems);
    } catch (error: any) {
      res.status(404).json({ msg: "An error occured:" + error.message, route: "/read/picking-list" });
    }
  });

  updatePickingListItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    try {
      if (body) {
        await TasksService.updatePickingListItem(body);

        res.status(200).json({ msg: "Successfully updated" });
      } else {
        res.status(400).json({ msg: "An error occured:", route: "update/picking-list" });
      }
    } catch (error: any) {
      res.status(500).json({ msg: "An error occured:" + error.message, route: "/update/picking-list" });
    }
  });

  getPackingList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = req.query?.page ? parseInt(req.query?.page as string) : 1;
    const limit = req.query?.limit ? parseInt(req.query.limit as string) : 10;

    try {
      const data = await TasksService.getAllOrdersPaginated({ page, limit });

      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ msg: "An error occured:" + error.message, route: "/read/packing-list" });
    }
  });

  updatePackingItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.body || req.params) {
        const id = req.params.id;

        const updatedOrder = await TasksService.updatePackingListItem(req.body, id);

        res.status(200).json(updatedOrder);
      } else {
        res.status(500).json({ msg: "An error occured:", route: "update/packing-list/:id" });
      }
    } catch (error: any) {
      res.status(500).json({ msg: "An error occured:" + error.message, route: "/read/packing-list/:id" });
    }
  });
}

export default new WarehouseController();
