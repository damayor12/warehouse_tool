export const updateOrderRequest = async (item) => {
  return fetch(`http://localhost:9001/update/packing-list/${item._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updateStatus: item.pack_status === "completed" ? "incomplete" : "completed",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => {
      console.error("error occured", error);
    });
};

export const updateListItemRequest = async (ids, pick_status) => {
  return fetch(`http://localhost:9001/update/picking-list`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateStatus: pick_status === "completed" ? "incomplete" : "completed", itemIds: ids }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => {
      console.error("error occured", error);
    });
};

export const getPickingListItems = async () => {
  return fetch("http://localhost:9001/read/picking-list")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => console.error("error occured", error));
};

export const getPackingOrdersItems = async (currentPage) => {
  return fetch(`http://localhost:9001/read/packing-list?page=${currentPage}&limit=3`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => console.error("error occured", error));
};
