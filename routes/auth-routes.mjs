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
    : "http://localhost:3001/fashionframe";
const redirectSigninUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/fashionframe/signin"
    : "http://localhost:3001/fashionframe/signin";

router.get("/user", (req, res) => {
  console.log("User: ");
  console.log(req.user);

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

// Facebook

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["user_about_me"]
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: redirectSigninUrl
  }),
  (req, res) => {
    res.redirect(redirectMainUrl);
  }
);

export default router;