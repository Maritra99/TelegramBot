const botHelper = require("../../Bot/botHelper");
const model = require("../../Model/schema");
const transactionModel = require("../../Model/transactionModel");
const keyboard = require("../../Static/Keyboard");
const message = require("../../Static/message");
const { notifyErrorToAdmin } = require("../../Utils/notifyToAdmin");
const dashboard = require("./dashboard");
const calculateRedemptionTime = require("../../Utils/calculateRedemtionTime");

module.exports = async ({ userChatId, messageId, userDetails, paymentId }) => {
  // Once User clicks keyboard delete that
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  const transactionData = await transactionModel.fetchTransaction(
    userChatId,
    paymentId
  );

  if (!transactionData[0]) {
    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );

    notifyErrorToAdmin(
      `Transaction not Found in Payment Confirmation for User Id: ${String(
        userChatId
      )} and Txn id: ${String(paymentId)}`
    );
  }

  // Derive redemptionTime based on transactionTime and plan duration
  const { planDuration } = transactionData[0];

  const transactionTime = new Date();
  const redemptionTime = calculateRedemptionTime(transactionTime, planDuration);

  // Update Transaction Time
  const updatedTransaction = await transactionModel.updatePaymentTimeAndStatus(
    userChatId,
    paymentId,
    transactionTime,
    redemptionTime,
    model.PaymentStatus.SUCCESS
  );

  if (!updatedTransaction) {
    const messageToAdmin = `Transaction Not Found While Time Updating\nuserChatId: ${String(
      userChatId
    )}\nmessageId: ${String(messageId)}\nuserDetails: ${String(
      userDetails
    )}\npaymentId: ${String(paymentId)}`;

    notifyErrorToAdmin(messageToAdmin);

    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );

    return await dashboard({
      userChatId,
      userState: userState["payment_successful"],
    });
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

  // Add user chatId to admin keyboard to process payment status from admin
  const keyBoard = keyboard.PAYMENT_CONFIRMATION_FOR_ADMIN_KEY_BOARD.map(
    (key) =>
      key.map((obj) => ({
        text: obj.text,
        callback_data: obj.callback_data.concat(`_${userChatId}_${paymentId}`),
      }))
  );

  const messageToAdmin = `Payment Completed.\nUser: ${String(
    userDetails.first_name
  )} ${String(userDetails.last_name)}\nUsername: ${String(
    userDetails.username
  )}\nUser Id: ${String(userDetails.id)}\nPayment Id: ${String(
    paymentId
  )}\nPayment: ${String(amount)}`;

  // Send Keyboard to Admin to Update Status of payment
  botHelper.sendKeyboardToUser(
    process.env.MESSAGE_GROUP_CHAT_ID,
    messageToAdmin,
    keyBoard
  );

  // send message to User
  return botHelper.sendMessageToUser(
    userChatId,
    "Thanks For Choosing US. Your investment is being processed. it will soon reflect in your dashboard"
  );
};
