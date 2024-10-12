import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  console.log("********************");
  console.log("firstName", firstName);
  console.log("LastName", lastName);
  console.log("email", email);
  console.log("password", password);
  console.log("Hashed Password", hashedPassword);
  console.log("phone", phone);
  console.log("********************");

  try {
    const user = await User.create(req.body); 
    res.status(200).json({ msg: "User Registered 🚀" });
  } catch (error) {
    res.status(400).json({ error: error.message }); message
  }
};

export const login = async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  console.log("user to logiin", user);

  if (!user) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  const isValidUser =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!isValidUser) {
    return res.status(401).json({ msg: "invalid credentials" });
  }

  const token = createJWTToken({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  console.log(token);
  console.log("From login", user);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });
  console.log("user logged in");

  res.json({ msg: "User Logged In", user: user });
};
