const botHelper = require("../Bot/botHelper");

module.exports = async (chatId) => {
  await botHelper.sendMessageToUser(chatId, "📊 Here's your dashboard...");
};
