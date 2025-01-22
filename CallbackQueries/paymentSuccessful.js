const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");

module.exports = async (chatId, messageId) => {
  await transactionModel.updateTransaction(chatId, {
    transactionTime: Date.now(),
  });

  botHelper.deleteInlineKeyboard(chatId, messageId);

  return botHelper.sendMessageToUser(
    chatId,
    "Thanks For Choosing US. Your investment is being processed. it will soon reflect in your dashboard"
  );
};
