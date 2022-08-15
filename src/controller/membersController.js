const handleLogin = (req, res) => {
  const email = req.email;
  const password = req.body.password;

  return res.status(200).json({
    message: "hello world",
    yourEmail: email,
  });
};

export const membersController = { handleLogin };
