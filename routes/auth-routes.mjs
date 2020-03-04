import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import { updateUserUsername } from "../model/usersModel.mjs";

dotenv.config();

const router = express.Router();

const redirectMainUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/fashionframe"
    : "http://localhost:3000/fashionframe";
const redirectSigninUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/fashionframe/signin"
    : "http://localhost:3000/fashionframe/signin";
const redirectSettingsUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/fashionframe/settings"
    : "http://localhost:3000/fashionframe/settings";

router.get("/user", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({ error: "No user data - please log in" });
  }
});

router.put(
  "/user",
  connectEnsureLogin.ensureLoggedIn(redirectSigninUrl),
  async (req, res) => {
    const client = await pool.connect();

    try {
      await updateUserUsername(client, [
        req.body.userData.username,
        req.user.id
      ]);

      res.sendStatus(200);
    } catch (err) {
      console.log(err);

      if (err.code === "23505") {
        res.status(400).send({
          message: "Username already exists"
        });
      } else {
        res.status(400).send({
          message: "Could not update user data"
        });
      }
    } finally {
      client.release();
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(redirectMainUrl);
});

// Local

router.post(
  "/local/login",
  passport.authenticate("local-login", { failureRedirect: redirectSigninUrl }),
  (req, res) => {
    if (req.authInfo.message) res.status(400).send(req.authInfo);
    else res.sendStatus(200);
  }
);

router.post(
  "/local/register",
  passport.authenticate("local-register", {
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    if (req.authInfo.message) res.status(400).send(req.authInfo);
    else res.sendStatus(200);
  }
);

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
    if (req.user.redirectSettings) res.redirect(redirectSettingsUrl);
    else res.redirect(redirectMainUrl);
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
    if (req.user.redirectSettings) res.redirect(redirectSettingsUrl);
    else res.redirect(redirectMainUrl);
  }
);

// Steam

router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: redirectSigninUrl })
);

router.get(
  "/steam/redirect",
  passport.authenticate("steam", {
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    if (req.user.redirectSettings) res.redirect(redirectSettingsUrl);
    else res.redirect(redirectMainUrl);
  }
);

// Twitter

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    if (req.user.redirectSettings) res.redirect(redirectSettingsUrl);
    else res.redirect(redirectMainUrl);
  }
);

// Github

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    if (req.user.redirectSettings) res.redirect(redirectSettingsUrl);
    else res.redirect(redirectMainUrl);
  }
);

export default router;
