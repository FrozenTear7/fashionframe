import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import { updateUserUsername } from "../model/usersModel.mjs";

const router = express.Router();

const redirectMainUrl = "http://localhost:3000/";
const redirectSigninUrl = "http://localhost:3000/signin";

router.get("/user", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({ error: "No user data - please log in" });
  }
});

router.put("/user", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  const client = await pool.connect(redirectSigninUrl);

  try {
    await updateUserUsername(client, [req.body.userData.username, req.user.id]);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not update user data"
    });
  } finally {
    client.release();
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(redirectMainUrl);
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
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    res.redirect(redirectMainUrl);
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
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    res.redirect(redirectMainUrl);
  }
);

export default router;
