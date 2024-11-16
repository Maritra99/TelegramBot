const botHelper = require("../Bot/botHelper");
const message = require("../Static/message");

module.exports = (chatId) => {
  const unknownText = message.UNKNOWN_BUTTON;
  return botHelper.sendMessageToUser(chatId, unknownText);
};
