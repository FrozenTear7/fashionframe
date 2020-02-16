import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Okayga");
});

router.get("/logout", (req, res) => {
  res.send("Logout");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

export default router;
