import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Env Files Access
dotenv.config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Third Party Libreary
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is Working Fine",
  });
});

// importing Routes and Using
import usersRoutes from "./Routes/User.routes.js";

// Routes Use
app.use("/api/v1/users", usersRoutes);

export default app;
