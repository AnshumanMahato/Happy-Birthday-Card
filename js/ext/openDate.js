import config from "../config.js";

// Script start here

export const isBDay = function () {
  const startTime = new Date(config.birthDate + "T00:00").getTime();
  const endTime = startTime + 24 * 60 * 60 * 1000;
  const localTime = Date.now();
  alert(`${startTime} ${localTime} ${endTime}`);
  if (localTime < startTime) return "IS_EARLY";
  if (localTime > endTime) return "IS_LATE";
  return "ON_TIME";
};
