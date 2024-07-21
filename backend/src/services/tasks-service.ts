import Order from "../model/Order";

class TaskService {
  async getAllOrders() {
    try {
      return await Order.find({
        createdAt: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999),
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAllOrdersPaginated(props: { page: number; limit: number }) {
    const { page, limit } = props;

    try {
      const orders = await Order.find({
        createdAt: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999),
        },
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const count = await Order.countDocuments();
      const pending = await Order.find({ pack_status: "incomplete" });

      return {
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        count,
        pending: pending.length,
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updatePickingListItem(body: any) {
    try {
      const itemsPromises = body.itemIds.map((id: any) => {
        return Order.updateOne(
          { "lineItems.order_product_id": id },
          { $set: { "lineItems.$.pick_status": body.updateStatus } },
        );
      });

      await Promise.all(itemsPromises);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updatePackingListItem(body: any, id: string) {
    try {
      return await Order.findByIdAndUpdate(id, { pack_status: body.updateStatus });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new TaskService();
