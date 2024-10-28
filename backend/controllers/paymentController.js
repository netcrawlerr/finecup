import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";

dotenv.config();

export const makePayment = async (req, res) => {
  const { amount, phoneNumber, userId, products } = req.body;

  if (
    !amount ||
    phoneNumber === "" ||
    !userId ||
    !products ||
    products.length === 0
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const transactionRef = `chapa-${uuidv4()}`;
  console.log(transactionRef);

  const options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      amount: amount,
      currency: "ETB",
      phone_number: phoneNumber,
      tx_ref: transactionRef,
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
      "meta[hide_receipt]": "true",
    },
  };

  try {
    const response = await axios(options);

    const newPayment = new Payment({
      transactionRef: transactionRef,
      paymentStatus: "pending",
      paymentAmount: amount,
    });

    const savedPayment = await newPayment.save();
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment or Order creation error:", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
export const verifyPayment = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const payment = await Payment.findOne({ transactionRef: tx_ref });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    const options = {
      method: "GET",
      url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
      },
    };

    const chapaResponse = await axios(options);

    if (chapaResponse.data.status === "success") {
      payment.paymentStatus = "completed";
      await payment.save();

      const { userId, products } = req.body;
      const totalAmount = payment.paymentAmount;

      const newOrder = new Order({
        user: userId,
        products: products.map((prod) => ({
          product: prod.productId,
          quantity: prod.quantity,
        })),
        totalAmount: totalAmount,
        orderStatus: "pending",
        payment: payment._id,
      });

      const savedOrder = await newOrder.save();

      res.json({
        message: "Payment verified and order created successfully",
        orderId: savedOrder._id,
        paymentId: payment._id,
      });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
