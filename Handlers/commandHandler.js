const start = require("../Command/start");
const help = require("../Command/help");
const userState = require("../Static/userState");

module.exports = (chatId, message) => {
  const text = message.toLowerCase();

  if (text === "/start") {
    start(chatId, userState["start"]);
  } else if (text === "/help") {
    help(chatId);
  }
};
