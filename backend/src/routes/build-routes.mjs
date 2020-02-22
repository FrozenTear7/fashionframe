import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import frames from "../../public/warframe_data/frames.json";
import e from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await pool.connect();

  console.log(req.query);

  try {
    if (frames.frames.includes(req.query.frame)) {
      const setups = await client.query(
        "SELECT u.username, b.id, b.name, b.screenshot, b.frame FROM builds b JOIN users u ON u.id = b.user_id WHERE b.frame = $1 LIMIT $2 OFFSET $3",
        [req.query.frame, req.query.limit, req.query.offset]
      );

      const setupsCount = await client.query(
        "SELECT COUNT(b.id) FROM builds b JOIN users u ON u.id = b.user_id WHERE b.frame = $1",
        [req.query.frame]
      );

      res.send({ setups: setups.rows, setupsCount: setupsCount.rows[0].count });
    } else {
      const setups = await client.query(
        "SELECT u.username, b.id, b.name, b.screenshot, b.frame FROM builds b JOIN users u ON u.id = b.user_id LIMIT $1 OFFSET $2",
        [req.query.limit, req.query.offset]
      );

      const setupsCount = await client.query(
        "SELECT COUNT(b.id) FROM builds b JOIN users u ON u.id = b.user_id"
      );

      res.send({ setups: setups.rows, setupsCount: setupsCount.rows[0].count });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not fetch setups"
    });
  } finally {
    client.release();
  }
});

router.post(
  "/",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const build = req.body.build;
      const buildColorScheme = build.colorScheme;
      const attachments = build.attachments;
      const attachmentsColorScheme = attachments.colorScheme;
      const syandana = build.syandana;
      const syandanaColorScheme = syandana.colorScheme;

      const newBuildColorScheme = await client.query(
        'INSERT INTO color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [
          buildColorScheme.primary,
          buildColorScheme.secondary,
          buildColorScheme.tertiary,
          buildColorScheme.accents,
          buildColorScheme.emmissive1,
          buildColorScheme.emmissive2,
          buildColorScheme.energy1,
          buildColorScheme.energy2
        ]
      );

      const newAttachmentsColorScheme = await client.query(
        'INSERT INTO color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [
          attachmentsColorScheme.primary,
          attachmentsColorScheme.secondary,
          attachmentsColorScheme.tertiary,
          attachmentsColorScheme.accents,
          attachmentsColorScheme.emmissive1,
          attachmentsColorScheme.emmissive2,
          attachmentsColorScheme.energy1,
          attachmentsColorScheme.energy2
        ]
      );

      const newSyandanaColorScheme = await client.query(
        'INSERT INTO color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [
          syandanaColorScheme.primary,
          syandanaColorScheme.secondary,
          syandanaColorScheme.tertiary,
          syandanaColorScheme.accents,
          syandanaColorScheme.emmissive1,
          syandanaColorScheme.emmissive2,
          syandanaColorScheme.energy1,
          syandanaColorScheme.energy2
        ]
      );

      const newAttachments = await client.query(
        "INSERT INTO attachments (chest, left_arm, right_arm, left_leg, right_leg, ephemera, color_scheme_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
          attachments.chest,
          attachments.leftArm,
          attachments.rightArm,
          attachments.leftLeg,
          attachments.rightLeg,
          attachments.ephemera,
          newAttachmentsColorScheme.rows[0].id
        ]
      );

      const newSyandana = await client.query(
        "INSERT INTO syandanas (name, color_scheme_id) VALUES ($1, $2) RETURNING id",
        [syandana.name, newSyandanaColorScheme.rows[0].id]
      );

      await client.query(
        "INSERT INTO builds (name, frame, description, screenshot, helmet, skin, attachment_id, syandana_id, color_scheme_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          build.name,
          build.frame,
          build.description,
          build.screenshot,
          build.helmet,
          build.skin,
          newAttachments.rows[0].id,
          newSyandana.rows[0].id,
          newBuildColorScheme.rows[0].id,
          req.user.id
        ]
      );

      await client.query("COMMIT");
      res.sendStatus(200);
    } catch (err) {
      await client.query("ROLLBACK");
      console.log(err);
      res.status(400).send({
        message: "Could not create build"
      });
    } finally {
      client.release();
    }
  }
);

export default router;
