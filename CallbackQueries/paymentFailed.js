const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../Bot/botHelper");

module.exports = async (chatId, messageId) => {
  await transactionModel.deleteTransactionByChatId(chatId);

  botHelper.deleteInlineKeyboard(chatId, messageId);

  botHelper.sendMessageToUser(chatId, "Sorry to let you go");

  return await dashboard(chatId, userState["payment_failed"]);
};
