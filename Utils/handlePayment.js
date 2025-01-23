const botHelper = require("../Bot/botHelper");
const dashboard = require("../CallbackQueries/dashboard");
const { PaymentStatus } = require("../Model/schema");
const transactionModel = require("../Model/transactionModel");
const userStateModel = require("../Model/userStateModel");
const keyboard = require("../Static/Keyboard");
const message = require("../Static/message");
const userState = require("../Static/userState");
const renderMessage = require("./renderMessage");

const handlepayment = {};

handlepayment.handleEnteredPaymentAmount = async (userChatId, messageText) => {
  await userStateModel.saveUserState(
    userChatId,
    userState["entered_amount_to_invest"]
  );

  const investmentAmount = parseFloat(messageText);

  if (!isNaN(investmentAmount) && investmentAmount >= 50) {
    const updatedTransaction = await transactionModel.updateAmountInTransaction(
      userChatId,
      investmentAmount
    );

    let messageToSend;
    if (updatedTransaction) {
      if (
        updatedTransaction.transactions &&
        updatedTransaction.transactions.length > 0
      ) {
        const transaction = updatedTransaction.transactions.find(
          (trans) => trans.userPaymentState === PaymentStatus.PENDING
        );

        messageToSend = renderMessage(message.PLAN_CONFIRMATION_MESSAGE, {
          planName: transaction.plan.name,
          amount: transaction.amount,
          interest: transaction.plan.interest,
          time: transaction.plan.duration,
          profit:
            investmentAmount +
            (investmentAmount * parseFloat(transaction.plan.interest)) / 100,
        });
      }

      return botHelper.sendKeyboardToUser(
        userChatId,
        messageToSend,
        keyboard.CONFIRM_KEY_BOARD
      );
    }
  } else {
    botHelper.sendMessageToUser(
      userChatId,
      message.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM
    );
    return await dashboard({
      userChatId,
      userState: userState["cancel_amount"],
    });
  }
};

module.exports = handlepayment;
