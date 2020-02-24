import express from "express";

// const frames = require("../../public/warframe_data/frames.json");
// const ephemeras = require("../../public/warframe_data/ephemeras.json");
// const helmets = require("../../public/warframe_data/helmets.json");
// const skins = require("../../public/warframe_data/skins.json");
// const colorPickers = require("../../public/warframe_data/colorPickers.json");
// const chestAttachments = require("../../public/warframe_data/chestAttachments.json");
// const armAttachments = require("../../public/warframe_data/armAttachments.json");
// const legAttachments = require("../../public/warframe_data/legAttachments.json");
// const syandanas = require("../../public/warframe_data/syandanas.json");

import frames from "../../public/warframe_data/frames.json";
import ephemeras from "../../public/warframe_data/ephemeras.json";
import helmets from "../../public/warframe_data/helmets.json";
import skins from "../../public/warframe_data/skins.json";
import colorPickers from "../../public/warframe_data/colorPickers.json";
import chestAttachments from "../../public/warframe_data/chestAttachments.json";
import armAttachments from "../../public/warframe_data/armAttachments.json";
import legAttachments from "../../public/warframe_data/legAttachments.json";
import syandanas from "../../public/warframe_data/syandanas.json";

const router = express.Router();

router.get("/frames", (req, res) => {
  res.json(frames);
});

router.get("/ephemeras", (req, res) => {
  res.json(ephemeras);
});

router.get("/helmets", (req, res) => {
  res.json(helmets);
});

router.get("/skins", (req, res) => {
  res.json(skins);
});

router.get("/colorPickers", (req, res) => {
  res.json(colorPickers);
});

router.get("/chestAttachments", (req, res) => {
  res.json(chestAttachments);
});

router.get("/armAttachments", (req, res) => {
  res.json(armAttachments);
});

router.get("/legAttachments", (req, res) => {
  res.json(legAttachments);
});

router.get("/syandanas", (req, res) => {
  res.json(syandanas);
});

export default router;
