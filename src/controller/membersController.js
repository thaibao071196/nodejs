import pool from "../config/connectDB";

const handleLogin = (req, res) => {
  return res.status(200).json({
    message: "hello world",
  });
};

export const membersController = { handleLogin };
