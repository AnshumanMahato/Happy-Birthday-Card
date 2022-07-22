//jshint esversion:8

import config from "./config.js";
import { isBDay } from "./ext/openDate.js";
import setPage from "./ext/setPage.js";
import { late, soon } from "./pages.js";
import { animate } from "./animation.js";

/******************************************************* SETUP ************************************************************/

if (config.name) {
  document.querySelector(".name").textContent = config.name;
  if (config.nickname)
    document.querySelector(".nickname").textContent = config.nickname;
  else document.querySelector(".nickname").textContent = config.name;
}

if (config.pic)
  document.querySelector(
    ".bd-pic"
  ).style.backgroundImage = `url(${config.pic})`;

if (config.birthDate) {
  const status = isBDay();

  if (status === "IS_EARLY") setPage(soon);
  if (status === "IS_LATE") setPage(late);
}

animate();
