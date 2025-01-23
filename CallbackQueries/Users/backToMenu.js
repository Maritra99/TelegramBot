const botHelper = require("../../Bot/botHelper");

module.exports = async ({ userChatId }) => {
  await botHelper.sendMessageToUser(
    userChatId,
    "Returning to the main menu. 🔙"
  );
};
