import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import applicationRoutes from "./application.routes";

export default () => {
  const app = Router();
  authRoutes(app);
  userRoutes(app);
  applicationRoutes(app);
  return app;
};
