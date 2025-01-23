const transactionModel = require("../Model/transactionModel");
const userState = require("../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../Bot/botHelper");
const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");
const message = require("../Static/message");

module.exports = async ({ userChatId, messageId, paymentId }) => {
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  const deletedTransaction = await transactionModel.deleteTransaction(
    userChatId,
    paymentId
  );

  if (!deletedTransaction) {
    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );

    const messageToAdmin = `Error in Deleting payment in Cancel Amount\nuserChatId: ${userChatId}\nmessageId: ${messageId}\npaymentId: ${paymentId}`;
    return notifyErrorToAdmin(messageToAdmin);
  }

  return await dashboard({
    userChatId,
    userState: userState["cancel_amount"],
  });
};
