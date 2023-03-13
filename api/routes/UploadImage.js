const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

cloudinary.config({
  cloud_name: "dsqk80y9z",
  api_key: "375297186334363",
  api_secret: "TbZq1D-0KA1lVnsPpUA_vlZhCUU",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

const uploadAudio = async (file) => {
  console.log(file);
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  console.log(res);
  return res;
};

module.exports = {uploadImage, uploadAudio};
