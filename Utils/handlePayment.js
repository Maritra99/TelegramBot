const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const userStateModel = require("../Model/userStateModel");
const keyboard = require("../Static/Keyboard");
const message = require("../Static/message");
const userState = require("../Static/userState");
const renderMessage = require("./renderMessage");

const handlepayment = {};

handlepayment.handleEnteredPaymentAmount = async (chatId, messageText) => {
  await userStateModel.saveUserState(
    chatId,
    userState.ENTERED_AMOUNT_TO_INVEST
  );

  const investmentAmount = parseFloat(messageText);

  if (!isNaN(investmentAmount) && investmentAmount >= 50) {
    await transactionModel.updateTransaction(chatId, {
      amount: investmentAmount,
    });

    // const messageToSend = renderMessage(message.PLAN_CONFIRMATION_MESSAGE, {
    //   planName: plan,
    //   amount: investmentAmount,
    //   interest: planDetails.interest,
    //   time: planDetails.time,
    //   profit:
    //     investmentAmount +
    //     (investmentAmount * parseInt(planDetails.interest)) / 100,
    // });

    return botHelper.sendKeyboardToUser(
      chatId,
      message.PLAN_CONFIRMATION_MESSAGE,
      keyboard.CONFIRM_KEY_BOARD
    );
  } else {
    return botHelper.sendMessageToUser(
      chatId,
      message.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM
    );
  }
};

module.exports = handlepayment;
