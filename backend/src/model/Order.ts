import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    order_date: Date,
    total: Number,
    customer_name: String,
    customer_address: String,
    customer_email: String,
    shipping_address: String,
    pack_status: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
    lineItems: [
      {
        lineItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LineItem",
          required: true,
        },
        order_product_id: String,
        pick_status: {
          type: String,
          enum: ["incomplete", "complete"],
          default: "incomplete",
        },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Order", OrderSchema);
