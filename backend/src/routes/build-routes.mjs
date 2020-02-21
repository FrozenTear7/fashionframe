import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";

const router = express.Router();

router.post(
  "/",
  // connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
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

      const newBuild = await client.query(
        "INSERT INTO builds (name, description, screenshot, helmet, skin, attachment_id, syandana_id, color_scheme_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          build.name,
          build.description,
          build.screenshot,
          build.helmet,
          build.skin,
          newAttachments.rows[0].id,
          newSyandana.rows[0].id,
          newBuildColorScheme.rows[0].id
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
