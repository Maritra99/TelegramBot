const botHelper = require("../Bot/botHelper");

module.exports = (chatId) => {
  const startText =
    "Welcome to the Financial Investment Bot! Type /help to see available commands.";

  return botHelper.sendMessage(chatId, startText);
};
