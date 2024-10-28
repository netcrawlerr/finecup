import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.body;   
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
