import Product from "../models/productModel.js";
import mongoose from "mongoose";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  console.log(req.body);

  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ msg: "Product Created" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
