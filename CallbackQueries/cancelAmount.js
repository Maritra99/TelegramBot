const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");

module.exports = async (chatId) => {
  await transactionModel.deleteTransactionByChatId(chatId);
  return await dashboard(chatId, userState["cancel_amount"]);
};
