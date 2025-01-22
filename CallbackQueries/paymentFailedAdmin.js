const transactionModel = require("../Model/transactionModel");
const botHelper = require("../Bot/botHelper");
const { PaymentStatus } = require("../Model/schema");

module.exports = async (chatId, messageId, userChatId) => {
  // Update the Payment Status as Failed for userChatId
  const updatedTransaction = await transactionModel.updateTransaction(
    userChatId,
    {
      adminPaymentState: PaymentStatus.FAILED,
    }
  );

  // If transaction not found notify the admin
  if (!updatedTransaction) {
    return await botHelper.sendMessageToUser(
      chatId,
      `Payment Not Found for User ${userChatId}`
    );
  }

  // Notify the user about the failure
  await botHelper.sendMessageToUser(
    userChatId,
    `Your payment of ₹${updatedTransaction.amount} has been marked as failed by the admin. Please contact support.`
  );

  // Delete Inline Keyboard for Admin
  botHelper.deleteInlineKeyboard(chatId, messageId);

  // Confirm admin action
  return await botHelper.editMessageText(
    `Payment from user ${userChatId} for ₹${updatedTransaction.amount} has been marked as failed.`,
    chatId,
    messageId
  );
};
