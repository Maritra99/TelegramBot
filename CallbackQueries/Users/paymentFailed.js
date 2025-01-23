const transactionModel = require("../../Model/transactionModel");
const userState = require("../../Static/userState");
const dashboard = require("./dashboard");
const botHelper = require("../../Bot/botHelper");
const message = require("../../Static/message");

module.exports = async ({ userChatId, messageId, userDetails, paymentId }) => {
  const deletedTransaction = await transactionModel.deleteTransaction(
    userChatId,
    paymentId
  );

  if (!deletedTransaction) {
    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );

    const messageToAdmin = `Error in Deleting payment in Payment Failed\nuserChatId: ${JSON.stringify(
      userChatId
    )}\nUserDetails: ${JSON.stringify(
      userDetails
    )}\nmessageId: ${JSON.stringify(messageId)}\npaymentId: ${JSON.stringify(
      paymentId
    )}`;
    return notifyErrorToAdmin(messageToAdmin);
  }

  botHelper.deleteInlineKeyboard(userChatId, messageId);

  botHelper.sendMessageToUser(userChatId, "Sorry to let you go");

  return await dashboard({
    userChatId,
    userState: userState["payment_failed"],
  });
};
