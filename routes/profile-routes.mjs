import express from "express";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import { getUserProfileInfoById } from "../model/usersModel.mjs";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const userInfo = await getUserProfileInfoById(client, [req.params.id]);

    res.send({ userInfo: userInfo });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not fetch user info"
    });
  } finally {
    client.release();
  }
});

export default router;
