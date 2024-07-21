import { body, param, query } from "express-validator";

class TasksValidator {
  checkUpdatePickingListItem() {
    return [
      body("itemIds")
        .notEmpty()
        .withMessage("The itemIds body value should not be empty")
        .isArray()
        .withMessage("itemIds body must be an array of strings"),
      body("updateStatus").notEmpty().withMessage("The updateStatus value should not be empty"),
    ];
  }

  checkUpdatePackingListItem() {
    return [
      param("id").notEmpty().withMessage("id param should not be empty"),
      body("updateStatus").notEmpty().withMessage("The updateStatus value should not be empty"),
    ];
  }

  checkReadOrders() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("limit should be integer between 1 and 10"),
      query("page").optional().isNumeric().withMessage("page should be a number"),
    ];
  }
}

export default new TasksValidator();
