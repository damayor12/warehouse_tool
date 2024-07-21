import express from "express";
import TasksValidator from "../validator";
import Middlewares from "../middleware";
import WarehouseController from "../controllers/warehouse";
const router = express.Router();

router.put(
  "/update/picking-list",
  TasksValidator.checkUpdatePickingListItem(),
  Middlewares.handleValidationError,
  WarehouseController.updatePickingListItem,
);

router.put(
  "/update/packing-list/:id",
  TasksValidator.checkUpdatePackingListItem(),
  Middlewares.handleValidationError,
  WarehouseController.updatePackingItem,
);

router.get("/read/picking-list", WarehouseController.getPickingList);

router.get(
  "/read/packing-list",
  TasksValidator.checkReadOrders(),
  Middlewares.handleValidationError,
  WarehouseController.getPackingList,
);

export default router;
