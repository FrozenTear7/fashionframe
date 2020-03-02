import cloudinary from "cloudinary";

export const uploadPhoto = image => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, imageInfo) => {
      if (err) return reject(err);
      return resolve(imageInfo.url);
    });
  });
};
