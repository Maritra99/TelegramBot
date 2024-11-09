const start = require("../Command/start");
const help = require("../Command/help");

module.exports = (chatId, message) => {
  const text = message.toLowerCase();

  if (text === "/start") {
    start(chatId);
  } else if (text === "/help") {
    help(chatId);
  }
};
