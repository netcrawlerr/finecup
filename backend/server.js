import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import express from "express";
const app = express();

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

if (process.env.NODE_ENV === "netcrawlerdev") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payments", paymentRouter);

const PORT = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected To MongoDB..");
  app.listen(PORT, () => {
    console.log("Server Running on Port ", PORT);
  });
} catch (error) {
  console.log(error);
}
