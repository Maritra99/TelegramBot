const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../Bot/botHelper");

module.exports = async ({ userChatId, messageId }) => {
  await transactionModel.deleteTransactionByChatId(userChatId);

  botHelper.deleteInlineKeyboard(userChatId, messageId);

  botHelper.sendMessageToUser(userChatId, "Sorry to let you go");

  return await dashboard({
    userChatId,
    userState: userState["payment_failed"],
  });
};
