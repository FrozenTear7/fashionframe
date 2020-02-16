import express from "express";
import connectEnsureLogin from "connect-ensure-login";

const router = express.Router();

router.get(
  "/",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/"),
  (req, res) => {
    res.send("testing");
  }
);

export default router;
