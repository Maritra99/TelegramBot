const botHelper = require("../../Bot/botHelper");
const model = require("../../Model/schema");
const transactionModel = require("../../Model/transactionModel");
const keyboard = require("../../Static/Keyboard");
const message = require("../../Static/message");
const { notifyErrorToAdmin } = require("../../Utils/notifyToAdmin");
const dashboard = require("./dashboard");

module.exports = async ({ userChatId, messageId, userDetails, paymentId }) => {
  // Once User clicks keyboard delete that
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  // Update Transaction Time
  const updatedTransaction = await transactionModel.updatePaymentTimeAndStatus(
    userChatId,
    paymentId,
    Date.now(),
    model.PaymentStatus.SUCCESS
  );

  if (!updatedTransaction) {
    const messageToAdmin = `Transaction Not Found While Time Updating\nuserChatId: ${JSON.stringify(
      userChatId
    )}\nmessageId: ${JSON.stringify(messageId)}\nuserDetails: ${JSON.stringify(
      userDetails
    )}\npaymentId: ${JSON.stringify(paymentId)}`;

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

  const messageToAdmin = `Payment Completed.\nUser: ${JSON.stringify(
    userDetails.first_name
  )} ${JSON.stringify(userDetails.last_name)}\nUsername: ${JSON.stringify(
    userDetails.username
  )}\nUser Id: ${JSON.stringify(userDetails.id)}\nPayment Id: ${JSON.stringify(
    paymentId
  )}\nPayment: ${JSON.stringify(amount)}`;

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
