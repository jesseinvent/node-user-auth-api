import express, { json } from "express";
import helmet from "helmet";
import routes from "./routes/v1/index.js";
import sanitizer from "express-mongo-sanitize";
import xss from "xss-clean";
import morgan from "morgan";
import cors from "cors";
import connectDatabase from "./config/database.js";
import responseTime from "response-time";
import { configs } from "./config/configs.js";
import { handleError, AppError } from "./utils/error/AppError.js";
import sendSuccessApiResponse from "./utils/responses/sendSuccessApiResponse.js";

// Establish connection to DB
connectDatabase();

const app = express();

if (configs.NODE_ENV === "development") app.use(morgan("combined"));

app.use(responseTime());

// Express body parsers
app.use(json());

// CORS middleware
app.use(cors());

// MongoDB santizer
app.use(sanitizer());

// xss clean
app.use(xss());

app.use(helmet());

app.get("/", (req, res, next) => {
  return sendSuccessApiResponse(res, {
    statusCode: 200,
    message: "Welcome to User Auth API 😁",
    data: {},
  });
});

app.use("/api/v1", routes);

app.all("*", (req, res, next) => {
  next(new AppError(404, "Invalid Route! 🙄"));
});

// Global Error hanlder
app.use((err, req, res, next) => {
  handleError(res, err);
});
export default app;
