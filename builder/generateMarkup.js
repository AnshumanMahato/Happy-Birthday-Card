// When data is fetched from telegra.ph
const generateMarkupRemote = function (node) {
  const { tag, children } = node;
  if (tag === "br") return "<br/>";
  if (!children) return "";
  const paraTags = ["h3", "h4", "blockquote", "aside", "p"];
  let content = "";
  children.forEach((child) => {
    if (typeof child === "object") content += generateMarkupRemote(child);
    else content += child;
  });
  if (paraTags.includes(tag)) return `<p>${content}</p>`;
  return content;
};

// When data is fetched from local file system
const generateMarkupLocal = function (msg) {
  return msg.split("\n").reduce((string, para) => {
    para = para.replace("\r", "");
    if (!para.length) return string;
    return string + `<p>${para}</p> `;
  }, "");
};

module.exports = {
  generateMarkupLocal,
  generateMarkupRemote,
};
