import { hexToRgb } from "./convertColor.js";

export const mapColors = colors => {
  let resultObject = {};

  colors.forEach(color => {
    resultObject[color] = hexToRgb(color);
  });

  return resultObject;
};
