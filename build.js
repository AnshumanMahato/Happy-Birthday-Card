const axios = require("axios").default;
const fs = require("fs");
const sharp = require("sharp");
require("dotenv").config();

const generateMarkup = function (node) {
  const { tag, children } = node;
  if (tag === "br") return "<br/>";
  if (!children) return "";
  const paraTags = ["h3", "h4", "blockquote", "p"];
  let content = "";
  children.forEach((child) => {
    if (typeof child === "object") content += generateMarkup(child);
    else content += child;
  });
  if (paraTags.includes(tag)) return `<p>${content}</p>`;
  return content;
};

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
    const path = process.env.SCROLL_MSG.split("/").pop();
    return axios.get(
      `https://api.telegra.ph/getPage/${path}?return_content=true`
    );
  })
  .then((res) => {
    const { content } = res.data.result;
    const markup = content.reduce(
      (string, node) => string + generateMarkup(node),
      ""
    );
    fs.writeFileSync("hello.html", markup, {
      encoding: "utf-8",
    });
  });
