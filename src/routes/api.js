import express from "express";
import { membersController } from "../controller/membersController";

const router = express.Router();
const { handleLogin } = membersController;

const initApiRoute = (app) => {
  router.post("/login", handleLogin);

  return app.use("/api/v1", router);
};

export default initApiRoute;
