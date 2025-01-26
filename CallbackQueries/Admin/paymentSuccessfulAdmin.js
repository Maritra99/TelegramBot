const transactionModel = require("../../Model/transactionModel");
const botHelper = require("../../Bot/botHelper");
const { PaymentStatus } = require("../../Model/schema");

module.exports = async ({ adminChatId, messageId, userChatId, paymentId }) => {
  // Update the Payment Status as Success for userChatId
  const updatedTransaction = await transactionModel.updatePaymentStatusForAdmin(
    userChatId,
    paymentId,
    PaymentStatus.SUCCESS
  );

  // If transaction not found notify the admin
  if (!updatedTransaction) {
    return await botHelper.sendMessageToUser(
      adminChatId,
      `Payment Not Found While Approving.\nUser Id: ${userChatId}\nPayment Id: ${paymentId}`
    );
  }

  const transactionObj =
    updatedTransaction.transactions &&
    updatedTransaction.transactions.find(
      (trans) => trans.transactionId === paymentId
    );

  let amount;
  if (transactionObj && transactionObj.amount) {
    amount = transactionObj.amount;
  }

  // Delete Message + Inline Keyboard for Admin
  botHelper.deleteMessage(adminChatId, messageId);

  const messageToSendToAdmin = `Payment Marked as Success\nUser Id: ${String(
    userChatId
  )}\nPayment Id: ${String(paymentId)}\nAmount: ₹${String(amount)}`;

  // Acknowledge Admin
  return await botHelper.sendMessageToUser(adminChatId, messageToSendToAdmin);
};
