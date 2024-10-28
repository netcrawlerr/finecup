import Router from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);

export default router;
