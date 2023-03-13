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



module.exports = uploadAudio;
