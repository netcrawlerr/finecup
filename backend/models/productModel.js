import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
