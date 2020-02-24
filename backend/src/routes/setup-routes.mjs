import express from "express";
import connectEnsureLogin from "connect-ensure-login";
import pool from "../config/db-connect.mjs";
import {
  getSetupList,
  getSetupByUserAndSetupId,
  getSetupsCount
} from "../model/setupsModel.mjs";
import {
  getAttachmentsById,
  createAttachments
} from "../model/attachmentsModel.mjs";
import { getSyandanaById } from "../model/syandanasModel.mjs";
import {
  getColorSchemeById,
  createColorScheme
} from "../model/colorSchemesModel.mjs";
import {
  createSetupUserLike,
  deleteSetupUserLike
} from "../model/setupsUsersModel.mjs";
import { createSetup } from "../model/setupsModel.mjs";
import { createSyandana } from "../model/syandanasModel.mjs";
import { deleteSetupBySetupAndUserId } from "../model/setupsModel.mjs";
import { getSetupAuthor } from "../model/setupsModel.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await pool.connect();

  try {
    let orderBy = "liked";

    if (req.query.order === "New") orderBy = "created_at";

    const setupListInfo = await getSetupList(
      client,
      [orderBy, req.query.limit, req.query.offset],
      req.query.frame
    );

    const setupsCount = await getSetupsCount(client, [req.query.frame]);

    res.send({ setups: setupListInfo, setupsCount: setupsCount });
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
    const setup = await getSetupByUserAndSetupId(client, [
      req.user.id,
      req.params.id
    ]);

    const attachments = await getAttachmentsById(client, [setup.attachment_id]);
    const syandana = await getSyandanaById(client, [setup.syandana_id]);

    const setupColorScheme = await getColorSchemeById(client, [
      setup.color_scheme_id
    ]);

    const attachmentsColorScheme = await getColorSchemeById(client, [
      attachments.color_scheme_id
    ]);

    const syandanaColorScheme = await getColorSchemeById(client, [
      syandana.color_scheme_id
    ]);

    const resultJson = {
      setup: {
        ...setup,
        attachments: {
          ...attachments,
          colorScheme: { ...attachmentsColorScheme }
        },
        syandana: {
          ...syandana,
          colorScheme: { ...syandanaColorScheme }
        },
        colorScheme: { ...setupColorScheme }
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

    try {
      if (req.body.like) {
        await createSetupUserLike(client, [req.params.id, req.user.id]);

        res.sendStatus(200);
      } else {
        await deleteSetupUserLike(client, [req.params.id, req.user.id]);

        res.sendStatus(200);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Error while (un)liking the setup"
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

      const newSetupColorScheme = await createColorScheme(client, [
        setupColorScheme.primary,
        setupColorScheme.secondary,
        setupColorScheme.tertiary,
        setupColorScheme.accents,
        setupColorScheme.emmissive1,
        setupColorScheme.emmissive2,
        setupColorScheme.energy1,
        setupColorScheme.energy2
      ]);

      const newAttachmentsColorScheme = await createColorScheme(client, [
        attachmentsColorScheme.primary,
        attachmentsColorScheme.secondary,
        attachmentsColorScheme.tertiary,
        attachmentsColorScheme.accents,
        attachmentsColorScheme.emmissive1,
        attachmentsColorScheme.emmissive2,
        attachmentsColorScheme.energy1,
        attachmentsColorScheme.energy2
      ]);

      const newSyandanaColorScheme = createColorScheme(client, [
        syandanaColorScheme.primary,
        syandanaColorScheme.secondary,
        syandanaColorScheme.tertiary,
        syandanaColorScheme.accents,
        syandanaColorScheme.emmissive1,
        syandanaColorScheme.emmissive2,
        syandanaColorScheme.energy1,
        syandanaColorScheme.energy2
      ]);

      const newAttachments = await createAttachments(client, [
        attachments.chest,
        attachments.leftArm,
        attachments.rightArm,
        attachments.leftLeg,
        attachments.rightLeg,
        attachments.ephemera,
        newAttachmentsColorScheme.id
      ]);

      const newSyandana = await createSyandana(client, [
        syandana.name,
        newSyandanaColorScheme.id
      ]);

      const newSetup = await createSetup(client, [
        setup.name,
        setup.frame,
        setup.description,
        setup.screenshot,
        setup.helmet,
        setup.skin,
        newAttachments.id,
        newSyandana.id,
        newSetupColorScheme.id,
        req.user.id
      ]);

      await client.query("COMMIT");
      res.send({ setupId: newSetup.rows[0].id });
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

router.put(
  "/:id",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      const author = await getSetupAuthor(client, [req.params.id]);

      if (author.user_id !== req.user.id)
        res.status(403).send({
          message: "Setup editing not allowed"
        });

      await client.query("BEGIN");

      const setup = req.body.setup;
      const setupColorScheme = setup.colorScheme;
      const attachments = setup.attachments;
      const attachmentsColorScheme = attachments.colorScheme;
      const syandana = setup.syandana;
      const syandanaColorScheme = syandana.colorScheme;

      const updateSetup = await updateSetup(client, [
        setup.name,
        setup.frame,
        setup.description,
        setup.screenshot,
        setup.helmet,
        setup.skin,
        req.params.id
      ]);

      const updateAttachments = await updateAttachments(client, [
        attachments.chest,
        attachments.leftArm,
        attachments.rightArm,
        attachments.leftLeg,
        attachments.rightLeg,
        attachments.ephemera,
        updateSetup.attachment_id
      ]);

      const updateSyandana = await updateSyandana(client, [
        syandana.name,
        updateSetup.syandana_id
      ]);

      await updateColorScheme(client, [
        setupColorScheme.primary,
        setupColorScheme.secondary,
        setupColorScheme.tertiary,
        setupColorScheme.accents,
        setupColorScheme.emmissive1,
        setupColorScheme.emmissive2,
        setupColorScheme.energy1,
        setupColorScheme.energy2,
        updateSetup.color_scheme_id
      ]);

      await updateColorScheme(client, [
        attachmentsColorScheme.primary,
        attachmentsColorScheme.secondary,
        attachmentsColorScheme.tertiary,
        attachmentsColorScheme.accents,
        attachmentsColorScheme.emmissive1,
        attachmentsColorScheme.emmissive2,
        attachmentsColorScheme.energy1,
        attachmentsColorScheme.energy2,
        updateAttachments.color_scheme_id
      ]);

      await updateColorScheme(client, [
        syandanaColorScheme.primary,
        syandanaColorScheme.secondary,
        syandanaColorScheme.tertiary,
        syandanaColorScheme.accents,
        syandanaColorScheme.emmissive1,
        syandanaColorScheme.emmissive2,
        syandanaColorScheme.energy1,
        syandanaColorScheme.energy2,
        updateSyandana.color_scheme_id
      ]);

      await client.query("COMMIT");
      res.send({ setupId: updateSetup.id });
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

router.delete(
  "/:id",
  connectEnsureLogin.ensureLoggedIn("http://localhost:3000/signin"),
  async (req, res) => {
    const client = await pool.connect();

    try {
      await deleteSetupBySetupAndUserId(client, [req.params.id, req.user.id]);

      await deleteSetupUserLike(client, [req.params.id, req.user.id]);

      await client.query("COMMIT");
      res.sendStatus(200);
    } catch (err) {
      await client.query("ROLLBACK");
      console.log(err);
      res.status(400).send({
        message: "Could not delete setup"
      });
    } finally {
      client.release();
    }
  }
);

export default router;
