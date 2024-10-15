import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
