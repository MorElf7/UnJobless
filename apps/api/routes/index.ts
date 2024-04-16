import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export default () => {
  const app = Router();
  authRoutes(app);
  userRoutes(app);
  return app;
};
