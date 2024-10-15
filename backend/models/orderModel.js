import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
