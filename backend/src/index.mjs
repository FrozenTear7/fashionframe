import express from "express";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth-routes.mjs";
import warframeRoutes from "./routes/warframe-routes.mjs";
import setupRoutes from "./routes/setup-routes.mjs";
import passportSetup from "./config/passport-setup.mjs";
import pool from "./config/db-connect.mjs";

dotenv.config();

const serverUrl =
  process.env.MODE === "server"
    ? "https://frozentear7.github.io"
    : "http://localhost:3000";

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    saveUninitialized: false,
    resave: true,
    rolling: true,
    secure: true,
    cookie: {
      expires: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: serverUrl
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", warframeRoutes);
app.use("/setups", setupRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
