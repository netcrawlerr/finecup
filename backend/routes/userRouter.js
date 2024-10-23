import Router from "express";
import { getCurrentUser } from "../controllers/userController.js";

const router = Router();

router.get("/current", getCurrentUser);

export default router;
