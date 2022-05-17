// Import config
import config from "../config.js";

// Get global time
const utcDate = new Date();
const date = utcDate.getUTCDate();
const month = utcDate.getUTCMonth();
const year = utcDate.getUTCFullYear();
const finalDate = Number(`${date}${month}${year}`);

// Script start here
if (config.openDate != false) {
  const openDate = Number(config.openDate.replaceAll("-", ""));

  if (finalDate > openDate) {
    location.href = "../../pages/late.html";
  } else if (finalDate < openDate) {
    location.href = "../../pages/soon.html";
  }
}
