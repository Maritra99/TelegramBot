const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const message = require("../Static/message");
const userState = require("../Static/userState");

module.exports = async (chatId) => {
  const unknownText = message.UNKNOWN_BUTTON;

  const currentState = await userStateModel.findUserStateByChatID(chatId);

  const allowedState = [
    userState.select_plan_1,
    userState.select_plan_2,
    userState.select_plan_3,
  ];

  if (currentState && allowedState.includes(currentState.state)) {
    // this.handleEnteredPaymentAmount(chatId, messageText, latestState.plan);
    return botHelper.sendMessageToUser(chatId, "unknownText");
  } else {
    return botHelper.sendMessageToUser(chatId, unknownText);
  }
};
