import express from "express";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import authRoutes from "./routes/auth-routes.mjs";
import warframeRoutes from "./routes/warframe-routes.mjs";
import setupRoutes from "./routes/setup-routes.mjs";
import profileRoutes from "./routes/profile-routes.mjs";
import passportSetup from "./config/passport-setup.mjs";
import pool from "./config/db-connect.mjs";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const serverUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/"
    : "http://localhost:3001";

const app = express();

const __dirname = path.resolve();
app.use("/sitemap.xml", express.static(path.join(__dirname, "/sitemap.xml")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    saveUninitialized: false,
    resave: true,
    rolling: true,
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
    origin: ["http://localhost:3000", "http://localhost:3001"]
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", warframeRoutes);
app.use("/setups", setupRoutes);
app.use("/profiles", profileRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
