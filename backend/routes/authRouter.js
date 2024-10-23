import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/validator.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
