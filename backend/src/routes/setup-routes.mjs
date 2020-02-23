import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import frames from "../../public/warframe_data/frames.json";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await pool.connect();

  try {
    if (frames.frames.includes(req.query.frame)) {
      const setups = await client.query(
        "SELECT u.username, s.id, s.name, s.screenshot, s.frame, (SELECT COUNT(*) FROM setups_users WHERE user_id = u.id) AS liked FROM setups s JOIN users u ON u.id = s.user_id WHERE s.frame = $1 LIMIT $2 OFFSET $3",
        [req.query.frame, req.query.limit, req.query.offset]
      );

      const setupsCount = await client.query(
        "SELECT COUNT(s.id) FROM setups s JOIN users u ON u.id = s.user_id WHERE s.frame = $1",
        [req.query.frame]
      );

      res.send({ setups: setups.rows, setupsCount: setupsCount.rows[0].count });
    } else {
      const setups = await client.query(
        "SELECT u.username, s.id, s.name, s.screenshot, s.frame, (SELECT COUNT(*) FROM setups_users WHERE user_id = u.id) AS liked FROM setups s JOIN users u ON u.id = s.user_id LIMIT $1 OFFSET $2",
        [req.query.limit, req.query.offset]
      );

      const setupsCount = await client.query(
        "SELECT COUNT(s.id) FROM setups s JOIN users u ON u.id = s.user_id"
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

router.get("/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const setup = await client.query(
      "SELECT u.username, s.*, (SELECT COUNT(*) FROM setups_users WHERE user_id = u.id) AS liked, EXISTS(SELECT 1 FROM setups_users WHERE user_id=$1) AS likedbyyou FROM setups s JOIN users u ON u.id = s.user_id WHERE s.id = $2",
      [req.user.id, req.params.id]
    );

    console.log(setup.rows[0].likedbyyou);

    const attachments = await client.query(
      "SELECT a.* FROM attachments a JOIN setups s ON s.attachment_id = a.id WHERE s.id = $1",
      [setup.rows[0].id]
    );

    const syandana = await client.query(
      "SELECT sy.* FROM syandanas sy JOIN setups s ON s.syandana_id = sy.id WHERE s.id = $1",
      [setup.rows[0].id]
    );

    const setupColorScheme = await client.query(
      "SELECT c.* FROM color_schemes c JOIN setups s ON s.color_scheme_id = c.id WHERE s.id = $1",
      [setup.rows[0].id]
    );

    const attachmentsColorScheme = await client.query(
      "SELECT c.* FROM color_schemes c JOIN attachments a ON a.color_scheme_id = c.id WHERE a.id = $1",
      [attachments.rows[0].id]
    );

    const syandanaColorScheme = await client.query(
      "SELECT c.* FROM color_schemes c JOIN syandanas sy ON sy.color_scheme_id = c.id WHERE sy.id = $1",
      [syandana.rows[0].id]
    );

    const resultJson = {
      setup: {
        ...setup.rows[0],
        attachments: {
          ...attachments.rows[0],
          colorScheme: { ...attachmentsColorScheme.rows[0] }
        },
        syandana: {
          ...syandana.rows[0],
          colorScheme: { ...syandanaColorScheme.rows[0] }
        },
        colorScheme: { ...setupColorScheme.rows[0] }
      }
    };

    res.send(resultJson);
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
  "/like/:id",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    console.log(req.params.id);
    console.log(req.user.id);
    console.log(req.body);
    console.log(req.body.like);

    try {
      if (req.body.like) {
        const likeSetup = await client.query(
          "INSERT INTO setups_users (setup_id, user_id) VALUES ($1, $2)",
          [req.params.id, req.user.id]
        );

        res.sendStatus(200);
      } else {
        const unlikeSetup = await client.query(
          "DELETE FROM setups_users WHERE setup_id = $1 AND user_id = $2",
          [req.params.id, req.user.id]
        );

        res.sendStatus(200);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Error while liking the setup"
      });
    } finally {
      client.release();
    }
  }
);

router.post(
  "/",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const setup = req.body.setup;
      const setupColorScheme = setup.colorScheme;
      const attachments = setup.attachments;
      const attachmentsColorScheme = attachments.colorScheme;
      const syandana = setup.syandana;
      const syandanaColorScheme = syandana.colorScheme;

      const newSetupColorScheme = await client.query(
        'INSERT INTO color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [
          setupColorScheme.primary,
          setupColorScheme.secondary,
          setupColorScheme.tertiary,
          setupColorScheme.accents,
          setupColorScheme.emmissive1,
          setupColorScheme.emmissive2,
          setupColorScheme.energy1,
          setupColorScheme.energy2
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
        "INSERT INTO setups (name, frame, description, screenshot, helmet, skin, attachment_id, syandana_id, color_scheme_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          setup.name,
          setup.frame,
          setup.description,
          setup.screenshot,
          setup.helmet,
          setup.skin,
          newAttachments.rows[0].id,
          newSyandana.rows[0].id,
          newSetupColorScheme.rows[0].id,
          req.user.id
        ]
      );

      await client.query("COMMIT");
      res.sendStatus(200);
    } catch (err) {
      await client.query("ROLLBACK");
      console.log(err);
      res.status(400).send({
        message: "Could not create setup"
      });
    } finally {
      client.release();
    }
  }
);

export default router;
