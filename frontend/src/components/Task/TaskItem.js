import React from "react";

import LineItem from "./LineItem";
import OrderItem from "./OrderItem";

function TaskItem({ view, item, setIsCloseClick }) {
  const isPicking = view === "picking";

  return isPicking ? (
    <LineItem
      total={item[1].length}
      name={item[0]}
      itemIds={item[1].map((item) => item.order_product_id)}
      pick_status={item[1].some((item) => item.pick_status === "incomplete") ? "incomplete" : "completed"}
      setIsCloseClick={setIsCloseClick}
    />
  ) : (
    <OrderItem item={item} />
  );
}

export default TaskItem;
