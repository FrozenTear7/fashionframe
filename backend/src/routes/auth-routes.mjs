import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Okayga");
});

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
