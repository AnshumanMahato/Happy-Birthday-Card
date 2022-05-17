import config from "../config.js";

// Get local time
const localDate = new Date()
  .toLocaleString("en-us", {
    timeZone: config.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replaceAll("/", "");

// Script start here
if (config.openDate != false) {
  const openDate = Number(config.openDate.replaceAll("-", ""));

  if (localDate > openDate) {
    location.href = "../../pages/late.html";
  } else if (localDate < openDate) {
    location.href = "../../pages/soon.html";
  }
}
