import express from "express";
import passport from "passport";

const router = express.Router();

// router.get("/user", (req, res) => {
//   if (req.user) {
//     res.send(req.user);
//   } else {
//     res.send({ error: { message: "No user data - please log in" } });
//   }
// });

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
  // res.send(req.user.rows[0]);
  res.redirect("http://localhost:3000/");
});

export default router;
