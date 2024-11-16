const botHelper = require("../Bot/botHelper");

module.exports = async (chatId) => {
  await botHelper.sendMessageToUser(chatId, "Returning to the main menu. 🔙");
};
