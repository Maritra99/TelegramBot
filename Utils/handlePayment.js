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
    userState["entered_amount_to_invest"]
  );

  const investmentAmount = parseFloat(messageText);

  if (!isNaN(investmentAmount) && investmentAmount >= 50) {
    const updatedTransaction = await transactionModel.updateTransaction(
      chatId,
      {
        amount: investmentAmount,
      }
    );

    if (updatedTransaction) {
      const messageToSend = renderMessage(message.PLAN_CONFIRMATION_MESSAGE, {
        planName: updatedTransaction.plan.name,
        amount: updatedTransaction.amount,
        interest: updatedTransaction.plan.interest,
        time: updatedTransaction.plan.duration,
        profit:
          investmentAmount +
          (investmentAmount * parseInt(updatedTransaction.plan.interest)) / 100,
      });

      return botHelper.sendKeyboardToUser(
        chatId,
        messageToSend,
        keyboard.CONFIRM_KEY_BOARD
      );
    }
  } else {
    return botHelper.sendMessageToUser(
      chatId,
      message.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM
    );
  }
};

module.exports = handlepayment;
