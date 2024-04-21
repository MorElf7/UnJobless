import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ApplicationController } from "../controllers/application.controller";
import { auth } from "../middlewares/auth";

const router = Router();

export default (app: Router) => {
  app.use("/application", router);

  router.get(
    "/",
    auth(),
    expressAsyncHandler(ApplicationController.getApplications),
  );

  router.get(
    "/:appId",
    auth(),
    expressAsyncHandler(ApplicationController.getApplicationById),
  );

  router.post(
    "/",
    auth(),
    expressAsyncHandler(ApplicationController.saveApplication),
  );
};
