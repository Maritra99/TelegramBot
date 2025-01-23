const botHelper = require("../../Bot/botHelper");
const userStateModel = require("../../Model/userStateModel");

module.exports = async ({ userChatId, userState }) => {
  if (userState) {
    await userStateModel.saveUserState(userChatId, userState);
  }

  await botHelper.sendMessageToUser(userChatId, "📊 Here's your dashboard...");
};
