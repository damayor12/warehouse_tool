export const task = [
  {
    lineItemId: "669b0ba00b66a9c87bd54d68",
    order_product_id: "8ab02408-5c49-469e-b416-5acbb1e4c3fa",
    pick_status: "completed",
    name: "Valentines Box",
    quantity: 1,
    _id: "669b0ba00b66a9c87bd54d77",
  },
];

export const order = [
  {
    _id: "669b0ba00b66a9c87bd54d7e",
    order_date: "2024-07-20T00:58:08.203Z",
    total: 150,
    customer_name: "Luke",
    customer_email: "Luke@gmail.com",
    shipping_address: "1 LukeStreet East",
    lineItems: [...task],
    __v: 0,
    pack_status: "completed",
  },
];
