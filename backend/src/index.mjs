import express from "express";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import cookieSession from "cookie-session";
import authRoutes from "./routes/auth-routes.mjs";
import passportSetup from "./config/passport-setup.mjs";
import pool from "./config/db-connect.mjs";

dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY
  })
);
app.use(passport.initialize());
app.use(passport.session());

let user = {};

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get("/", (req, res) => {
  res.send("An alligator approaches!");
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_table");
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
