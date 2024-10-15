import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();

export const makePayment = async (req, res) => {
  const { amount, phoneNumber } = req.body;

  console.log("Amount", amount);
  console.log("Phone Number", phoneNumber);

  if (!amount || phoneNumber === "") {
    return res.status(400).json({ msg: "Fields required" });
  }

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
      tx_ref: `chapa-${uuidv4()}`,
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
      "meta[hide_receipt]": "true",
    },
  };

  try {
    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { tx_ref } = req.params;
  const options = {
    method: "GET",
    url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
    },
  };

  try {
    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
