const axios = require("axios").default;
const fs = require("fs");
const sharp = require("sharp");
require("dotenv").config();

axios
  .get(process.env.PIC, {
    responseType: "arraybuffer",
  })
  .then((res) => {
    return sharp(res.data)
      .resize(400, 400)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`hello.jpg`);
  })
  .then(() => {
    console.log("IMAGE Downloaded successfully!!!");
  });
