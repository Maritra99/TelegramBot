const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");

module.exports = async (chatId, userState) => {
  if (userState) {
    await userStateModel.saveUserState(chatId, userState);
  }

  await botHelper.sendMessageToUser(chatId, "📊 Here's your dashboard...");
};
