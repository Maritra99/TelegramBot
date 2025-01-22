const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const dashBoard = require("./dashboard");
const userState = require("../Static/userState");
const generateAndSendQRCode = require("../Utils/generateAndSendQRCode");
const message = require("../Static/message");
const renderMessage = require("../Utils/renderMessage");
const keyboard = require("../Static/Keyboard");

module.exports = async (chatId, messageId) => {
  botHelper.deleteInlineKeyboard(chatId, messageId);

  const transactionData = await transactionModel.fetchTransactionByChatId(
    chatId
  );

  if (!transactionData) {
    await botHelper.sendMessageToUser(chatId, message.TRANSACTION_NOT_FOUND);
    return await dashBoard(chatId, userState["transaction_not_found"]);
  }

  botHelper.sendMessageToUser(
    chatId,
    renderMessage(message.PAYMENT_REQUEST_MESSAGE, {
      upiId: process.env.UPI_ID,
      amount: transactionData.amount,
    })
  );

  await generateAndSendQRCode(
    chatId,
    transactionData.amount,
    botHelper.sendImageToUser
  );

  return await botHelper.sendKeyboardToUser(
    chatId,
    "Select Payment Status",
    keyboard.PAYMENT_CONFIRMATION_KEY_BOARD
  );
};
