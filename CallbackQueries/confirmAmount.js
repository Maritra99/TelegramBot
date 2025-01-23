const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const dashBoard = require("./dashboard");
const userState = require("../Static/userState");
const generateAndSendQRCode = require("../Utils/generateAndSendQRCode");
const message = require("../Static/message");
const renderMessage = require("../Utils/renderMessage");
const keyboard = require("../Static/Keyboard");

module.exports = async ({ userChatId, messageId }) => {
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  const transactionData = await transactionModel.fetchTransactionByChatId(
    userChatId
  );

  if (!transactionData) {
    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );
    return await dashBoard({
      userChatId,
      userState: userState["transaction_not_found"],
    });
  }

  botHelper.sendMessageToUser(
    userChatId,
    renderMessage(message.PAYMENT_REQUEST_MESSAGE, {
      upiId: process.env.UPI_ID,
      amount: transactionData.amount,
    })
  );

  await generateAndSendQRCode(
    userChatId,
    transactionData.amount,
    botHelper.sendImageToUser
  );

  return await botHelper.sendKeyboardToUser(
    userChatId,
    "Select Payment Status",
    keyboard.PAYMENT_CONFIRMATION_KEY_BOARD
  );
};
