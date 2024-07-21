import mongoose from "mongoose";

export const LineItem = new mongoose.Schema({
  name: String,
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

export default mongoose.model("LineItem", LineItem);
