import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";

const router = express.Router();

router.get("/user", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({ error: "No user data - please log in" });
  }
});

router.put(
  "/user",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      const user = await client.query(
        "UPDATE users SET username = ($1) WHERE id = ($2)",
        [req.body.username, req.user.id]
      );
    } catch (err) {
      console.log(err);
      res.send({ error: err });
    } finally {
      client.release();
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000/");
});

export default router;
