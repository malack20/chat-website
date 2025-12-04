import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import profileRouter from "./routes/profile.routes";
import matchRouter from "./routes/match.routes";
import chatRouter from "./routes/chat.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.get("/", (_req, res) => {
  res.send("Dating app API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/match", matchRouter);
app.use("/api/chat", chatRouter);

app.use(errorMiddleware);

export default app;


