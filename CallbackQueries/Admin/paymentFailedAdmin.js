const transactionModel = require("../../Model/transactionModel");
const botHelper = require("../../Bot/botHelper");
const { PaymentStatus } = require("../../Model/schema");

module.exports = async ({ adminChatId, messageId, userChatId, paymentId }) => {
  // Update the Payment Status as Failed for userChatId
  const updatedTransaction = await transactionModel.updatePaymentStatusForAdmin(
    userChatId,
    paymentId,
    PaymentStatus.FAILED
  );

  // If transaction not found notify the admin
  if (!updatedTransaction) {
    return await botHelper.sendMessageToUser(
      adminChatId,
      `Payment Not Found While Rejcection.\nUser Id: ${userChatId}\nPayment Id: ${paymentId}`
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

  // Notify the user about the failure
  await botHelper.sendMessageToUser(
    userChatId,
    `Your payment of ₹${String(amount)} with Payment Id: ${String(
      paymentId
    )} has been marked as failed by the admin. Please contact support.`
  );

  // Delete Message + Inline Keyboard for Admin
  botHelper.deleteMessage(adminChatId, messageId);

  const messageToSendToAdmin = `Payment Marked as Failed\nUser Id: ${String(
    userChatId
  )}\nPayment Id: ${String(paymentId)}\nAmount: ₹${String(amount)}`;

  // Confirm admin action
  return await botHelper.sendMessageToUser(adminChatId, messageToSendToAdmin);
};
