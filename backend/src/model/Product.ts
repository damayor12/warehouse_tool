import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

export default mongoose.model("Product", ProductSchema);
