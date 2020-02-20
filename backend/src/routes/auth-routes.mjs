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
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      const user = await client.query(
        "UPDATE users SET username = ($1) WHERE id = ($2)",
        [req.body.userData.username, req.user.id]
      );
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not update user data"
      });
    } finally {
      client.release();
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

// Google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signin"
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

// Twitch

router.get(
  "/twitchtv",
  passport.authenticate("twitch", {
    scope: ["user_read"]
  })
);

router.get(
  "/twitchtv/redirect",
  passport.authenticate("twitch", {
    failureRedirect: "http://localhost:3000/signin"
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

export default router;
