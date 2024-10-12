import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const commonValidator = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log("Validation Errors: ", errors);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ];
};

export const validateLogin = commonValidator([
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password required"),
]);

export const validateRegister = commonValidator([
  body("firstName").notEmpty().withMessage("First name required"),
  body("lastName").notEmpty().withMessage("Last name required"),
  body("phone").notEmpty().withMessage("Phone number required"),
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Email is required")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password required"),
]);
