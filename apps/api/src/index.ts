import express, {
  json,
  urlencoded,
  Application,
  Request,
  Response,
} from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import cors from "cors";
import helmet from "helmet";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";

// Connect database
mongoose.connect(config.DB_URL);
const db = mongoose.connection;
db.on("error", () => console.log("connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Set up express
const app: Application = express();
const port = config.PORT;
app.enable("trust proxy");
app.use(cors());
app.use(helmet());
app.use(
  json({
    limit: "100mb",
  }),
);
app.use(
  urlencoded({
    limit: "100mb",
    extended: false,
    parameterLimit: 100000,
  }),
);
app.use(config.api.prefix, routes());
app.use("/swagger", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json")),
  );
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
