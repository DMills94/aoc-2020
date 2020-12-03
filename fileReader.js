const fs = require("fs");

const txtToArray = (path) => {
  return fs
    .readFileSync(path, "utf-8")
    .toString()
    .replace(/\r\n/g, "\n")
    .split("\n");
};

const stringToArray = (string) => {
  return string.replace(/\r\n/g, "\n").split("\n");
};

module.exports = { txtToArray, stringToArray };
