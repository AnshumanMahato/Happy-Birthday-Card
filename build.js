const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
require("dotenv").config();

const generateMarkup = function (node) {
  const { tag, children } = node;
  if (tag === "br") return "<br/>";
  if (!children) return "";
  const paraTags = ["h3", "h4", "blockquote", "aside", "p"];
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
      .toFile(`src/BdayPic.jpeg`);
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
    const readTime = (markup.split(" ").length / 200) * 60;
    const readVar = `<style>:root{
      --readTime: ${Math.round(readTime) + 15}s;
    }</style>`;
    let html = fs.readFileSync(path.join(__dirname, "./template.html"), {
      encoding: "utf-8",
    });
    html = html
      .replace("{{^READ_TIME}}", readVar)
      .replace("{{^SCROLL_MSG}}", markup)
      .replace("{{^HBD_MSG}}", process.env.HBD_MSG)
      .replace("{{^NAME}}", process.env.NAME)
      .replace(
        "{{^NICKNAME}}",
        process.env.NICKNAME ? process.env.NICKNAME : process.env.NAME
      );
    fs.writeFileSync("src/index.html", html, {
      encoding: "utf-8",
    });
    console.log("Index Generated");
  });
