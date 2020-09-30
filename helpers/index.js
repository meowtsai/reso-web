const uniqid = require("uniqid");
const md5 = require("md5");

function nl2br(str) {
  return str.replace(/([^>])\n/g, "$1<br/>\n");
}

function nl2brB(str) {
  return str.replace(/\n/g, "<br />\n");
}
const set_filename = () => md5(uniqid());

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const getRandomString = (length) => {
  const charString = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const charLength = charString.length;
  let result = "";
  for (let index = 0; index < length; index++) {
    result += charString.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

module.exports = { nl2br, nl2brB, set_filename, isEmpty, getRandomString };
