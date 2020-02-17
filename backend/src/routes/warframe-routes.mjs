import express from "express";
import frames from "../../public/warframe_data/frames.json";
import ephemeras from "../../public/warframe_data/ephemeras.json";
import helmets from "../../public/warframe_data/helmets.json";
import skins from "../../public/warframe_data/skins.json";
import colorPickers from "../../public/warframe_data/color-pickers.json";

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

export default router;
