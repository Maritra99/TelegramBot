const botHelper = require("../Bot/botHelper");

module.exports = (chatId, message) => {
  const unknownText =
    "I'm sorry, I didn't understand that. Type /help for a list of commands.";
  return botHelper.sendMessage(chatId, unknownText);
};
