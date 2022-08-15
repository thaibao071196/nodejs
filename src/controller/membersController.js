import { userService } from "../services/userService";

const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(200).json({
      erorCode: 1,
      message: "Missing inputs parameter",
    });
  }

  const dataUser = await userService.handleUserLogin(email, password);

  return res.status(500).json({
    erorCode: dataUser.errCode,
    message: dataUser.message,
    user: dataUser.user ?? {},
  });
};

export const membersController = { handleLogin };
