import Router from "express";
import {
  makePayment,
  verifyPayment,
} from "../controllers/paymentController.js";
const router = Router();

router.post("/pay", makePayment);
router.get("/verify", verifyPayment);

export default router;
