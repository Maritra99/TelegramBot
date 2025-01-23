const transactionModel = require("../../Model/transactionModel");
const botHelper = require("../../Bot/botHelper");
const { PaymentStatus } = require("../../Model/schema");

module.exports = async ({ adminChatId, messageId, userChatId }) => {
  // Update the Payment Status as Success for userChatId
  const updatedTransaction = await transactionModel.updateTransaction(
    userChatId,
    {
      adminPaymentState: PaymentStatus.SUCCESS,
    }
  );

  // If transaction not found notify the admin
  if (!updatedTransaction) {
    return await botHelper.sendMessageToUser(
      adminChatId,
      `Payment Not Found for User ${userChatId}`
    );
  }

  // Delete Inline Keyboard for Admin
  botHelper.deleteInlineKeyboard(adminChatId, messageId);

  // Confirm admin action
  return await botHelper.editMessageText(
    `Payment from user ${userChatId} for ₹${updatedTransaction.amount} has been marked as Success.`,
    adminChatId,
    messageId
  );
};
