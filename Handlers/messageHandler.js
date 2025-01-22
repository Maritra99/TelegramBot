const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const message = require("../Static/message");
const userState = require("../Static/userState");
const handlepayment = require("../Utils/handlePayment");

module.exports = async (chatId, messageText) => {
  const unknownText = message.UNKNOWN_BUTTON;

  // Fetch Current State to allow free text from user
  const currentState = await userStateModel.findUserStateByChatID(chatId);

  // States after which free text can be allowed (basically amount can be entered)
  const allowedStateForPaymentAmount = [
    userState.select_plan_1,
    userState.select_plan_2,
    userState.select_plan_3,
  ];

  if (
    currentState &&
    allowedStateForPaymentAmount.includes(currentState.state.reverse()[0])
  ) {
    return handlepayment.handleEnteredPaymentAmount(chatId, messageText);
  } else {
    return botHelper.sendMessageToUser(chatId, unknownText);
  }
};
