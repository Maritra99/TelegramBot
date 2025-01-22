const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../Bot/botHelper")

module.exports = async (chatId, messageId) => {
  botHelper.deleteInlineKeyboard(chatId, messageId);

  await transactionModel.deleteTransactionByChatId(chatId);

  return await dashboard(chatId, userState["cancel_amount"]);
};
