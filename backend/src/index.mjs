import express from "express";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import cookieSession from "cookie-session";
import authRoutes from "./routes/auth-routes.mjs";
import profileRoutes from "./routes/profile-routes.mjs";
import passportSetup from "./config/passport-setup.mjs";
import pool from "./config/db-connect.mjs";

dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Testing bruv");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
