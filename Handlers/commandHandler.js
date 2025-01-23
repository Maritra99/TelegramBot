const start = require("../Command/start");
const help = require("../Command/help");
const userState = require("../Static/userState");

module.exports = (args) => {
  const { message } = args;
  const text = message.toLowerCase();

  if (text === "/start") {
    start(args);
  } else if (text === "/help") {
    help(args);
  }
};
