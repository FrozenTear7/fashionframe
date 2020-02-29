import sharp from "sharp";

const maxWidth = 1000;
const maxHeight = 400;

export const imageResize = async (imagePath, outputPath) => {
  await sharp(imagePath)
    .resize(maxWidth, maxHeight, { fit: "inside" })
    .toFile(outputPath);
};
