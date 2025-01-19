const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const message = require("../Static/message");
const userState = require("../Static/userState");
const handlepayment = require("../Utils/handlePayment");

module.exports = async (chatId, messageText) => {
  const unknownText = message.UNKNOWN_BUTTON;

  const currentState = await userStateModel.findUserStateByChatID(chatId);

  const allowedStateForPaymentAmount = [
    userState.select_plan_1,
    userState.select_plan_2,
    userState.select_plan_3,
  ];

  if (
    currentState &&
    allowedStateForPaymentAmount.includes(currentState.state)
  ) {
    return handlepayment.handleEnteredPaymentAmount(chatId, messageText);
  } else {
    return botHelper.sendMessageToUser(chatId, unknownText);
  }
};
