import express from "express";
import connectEnsureLogin from "connect-ensure-login";
import dotenv from "dotenv";
import pool from "../config/db-connect.mjs";
import {
  getSetupList,
  getSetupBySetupId,
  getSetupsCount,
  updateSetup
} from "../model/setupsModel.mjs";
import {
  getAttachmentsById,
  createAttachments,
  updateAttachments
} from "../model/attachmentsModel.mjs";
import { getSyandanaById } from "../model/syandanasModel.mjs";
import {
  getSetupColorSchemeById,
  getAttachmentsColorSchemeById,
  getSyandanaColorSchemeById,
  createSetupColorScheme,
  createAttachmentsColorScheme,
  createSyandanaColorScheme,
  updateSetupColorScheme,
  updateAttachmentsColorScheme,
  updateSyandanaColorScheme
} from "../model/colorSchemesModel.mjs";
import {
  createSetupUserLike,
  deleteSetupUserLike
} from "../model/setupsUsersModel.mjs";
import { createSetup } from "../model/setupsModel.mjs";
import { createSyandana, updateSyandana } from "../model/syandanasModel.mjs";
import { deleteSetupBySetupAndUserId } from "../model/setupsModel.mjs";
import { getSetupAuthor } from "../model/setupsModel.mjs";

dotenv.config();

const redirectSigninUrl =
  process.env.MODE === "server"
    ? "https://fashionframe.herokuapp.com/fashionframe/signin"
    : "http://localhost:3000/fashionframe/signin";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await pool.connect();

  try {
    let orderBy = "liked";

    if (req.query.order === "New" || req.query.order === "Oldest")
      orderBy = "created_at";

    let order;

    if (req.query.order !== "Oldest") order = "DESC";
    else order = "ASC";

    const setupList = await getSetupList(
      client,
      [req.query.limit, req.query.offset],
      req.query.frame,
      orderBy,
      order
    );

    const setupsCount = await getSetupsCount(client, [req.query.frame]);

    res.send({ setups: setupList, setupsCount: setupsCount });
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
    const setup = await getSetupBySetupId(client, [req.params.id]);

    const attachments = await getAttachmentsById(client, [setup.id]);
    const syandana = await getSyandanaById(client, [setup.id]);

    const setupColorScheme = await getSetupColorSchemeById(client, [setup.id]);
    const attachmentsColorScheme = await getAttachmentsColorSchemeById(client, [
      attachments.id
    ]);
    const syandanaColorScheme = await getSyandanaColorSchemeById(client, [
      syandana.id
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
  connectEnsureLogin.ensureLoggedIn(redirectSigninUrl),
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
  connectEnsureLogin.ensureLoggedIn(redirectSigninUrl),
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

      const newSetup = await createSetup(client, [
        setup.name,
        setup.frame,
        setup.description,
        setup.screenshot,
        setup.helmet,
        setup.skin,
        req.user.id
      ]);

      const newAttachments = await createAttachments(client, [
        attachments.chest,
        attachments.leftArm,
        attachments.rightArm,
        attachments.leftLeg,
        attachments.rightLeg,
        attachments.ephemera,
        newSetup.id
      ]);

      const newSyandana = await createSyandana(client, [
        syandana.name,
        newSetup.id
      ]);

      await createSetupColorScheme(client, [
        setupColorScheme.primary,
        setupColorScheme.secondary,
        setupColorScheme.tertiary,
        setupColorScheme.accents,
        setupColorScheme.emmissive1,
        setupColorScheme.emmissive2,
        setupColorScheme.energy1,
        setupColorScheme.energy2,
        newSetup.id
      ]);

      await createAttachmentsColorScheme(client, [
        attachmentsColorScheme.primary,
        attachmentsColorScheme.secondary,
        attachmentsColorScheme.tertiary,
        attachmentsColorScheme.accents,
        attachmentsColorScheme.emmissive1,
        attachmentsColorScheme.emmissive2,
        attachmentsColorScheme.energy1,
        attachmentsColorScheme.energy2,
        newAttachments.id
      ]);

      await createSyandanaColorScheme(client, [
        syandanaColorScheme.primary,
        syandanaColorScheme.secondary,
        syandanaColorScheme.tertiary,
        syandanaColorScheme.accents,
        syandanaColorScheme.emmissive1,
        syandanaColorScheme.emmissive2,
        syandanaColorScheme.energy1,
        syandanaColorScheme.energy2,
        newSyandana.id
      ]);

      await client.query("COMMIT");
      res.send({ setupId: newSetup.id });
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
  connectEnsureLogin.ensureLoggedIn(redirectSigninUrl),
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

      const newUpdateSetup = await updateSetup(client, [
        setup.name,
        setup.frame,
        setup.description,
        setup.screenshot,
        setup.helmet,
        setup.skin,
        req.params.id
      ]);

      const newUpdateAttachments = await updateAttachments(client, [
        attachments.chest,
        attachments.leftArm,
        attachments.rightArm,
        attachments.leftLeg,
        attachments.rightLeg,
        attachments.ephemera,
        newUpdateSetup.id
      ]);

      const newUpdateSyandana = await updateSyandana(client, [
        syandana.name,
        newUpdateSetup.id
      ]);

      await updateSetupColorScheme(client, [
        setupColorScheme.primary,
        setupColorScheme.secondary,
        setupColorScheme.tertiary,
        setupColorScheme.accents,
        setupColorScheme.emmissive1,
        setupColorScheme.emmissive2,
        setupColorScheme.energy1,
        setupColorScheme.energy2,
        newUpdateSetup.id
      ]);

      await updateAttachmentsColorScheme(client, [
        attachmentsColorScheme.primary,
        attachmentsColorScheme.secondary,
        attachmentsColorScheme.tertiary,
        attachmentsColorScheme.accents,
        attachmentsColorScheme.emmissive1,
        attachmentsColorScheme.emmissive2,
        attachmentsColorScheme.energy1,
        attachmentsColorScheme.energy2,
        newUpdateAttachments.id
      ]);

      await updateSyandanaColorScheme(client, [
        syandanaColorScheme.primary,
        syandanaColorScheme.secondary,
        syandanaColorScheme.tertiary,
        syandanaColorScheme.accents,
        syandanaColorScheme.emmissive1,
        syandanaColorScheme.emmissive2,
        syandanaColorScheme.energy1,
        syandanaColorScheme.energy2,
        newUpdateSyandana.id
      ]);

      await client.query("COMMIT");
      res.send({ setupId: newUpdateSetup.id });
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
  connectEnsureLogin.ensureLoggedIn(redirectSigninUrl),
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
