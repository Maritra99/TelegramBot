const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../Bot/botHelper");

module.exports = async ({ userChatId, messageId }) => {
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  await transactionModel.deleteTransactionByChatId(userChatId);

  return await dashboard({ userChatId, userState: userState["cancel_amount"] });
};
