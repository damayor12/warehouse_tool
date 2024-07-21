import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterStatus: "all",
  view: localStorage.getItem("view") || "picking",
  taskList: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    storeTasks: (state, action) => {
      state.taskList = action.payload;
    },
    storeOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateListItem: (state, action) => {
      const updateTaskList = (arr) => {
        const updatedList = arr.map((item) => {
          if (action.payload.ids.indexOf(item.order_product_id) > -1) {
            item = { ...item, pick_status: action.payload.status };
          }

          return item;
        });

        state.taskList = [...updatedList];
      };

      updateTaskList(state.taskList);
    },
    updateOrder: (state, action) => {
      const updateOrdersList = (updatedOrder) => {
        const orderListArr = state.orders.orders.map((order) => {
          if (updatedOrder.id === order._id) {
            order = { ...order, pack_status: action.payload.status };
          }

          return order;
        });

        return orderListArr;
      };

      state.orders["orders"] = updateOrdersList(action.payload);
      state.orders["pending"] =
        action.payload.status === "completed" ? state.orders["pending"] - 1 : state.orders["pending"] + 1;
    },

    switchView: (state, action) => {
      state.view = action.payload;
      localStorage.setItem("view", action.payload);
    },
  },
});

export const { updateListItem, filterByStatus, storeTasks, switchView, updateOrder, storeOrders } = taskSlice.actions;
export default taskSlice.reducer;
