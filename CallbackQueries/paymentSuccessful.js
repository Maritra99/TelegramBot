const botHelper = require("../Bot/botHelper");
const { PaymentStatus } = require("../Model/schema");
const transactionModel = require("../Model/transactionModel");
const keyboard = require("../Static/Keyboard");

module.exports = async (chatId, messageId, userDetails) => {
  // Once User clicks keyboard delete that
  botHelper.deleteInlineKeyboard(chatId, messageId);

  // Update Transaction Time
  const updatedTransaction = await transactionModel.updateTransaction(chatId, {
    userPaymentState: PaymentStatus.SUCCESS,
    transactionTime: Date.now(),
  });

  const messageToAdmin = `
  Payment Completed
  User : ${userDetails.first_name} ${userDetails.last_name}
  Username : ${userDetails.username}
  Id : ${userDetails.id}
  Payment : ${updatedTransaction.amount}
  `;

  // Add user chatId to admin keyboard to process payment status from admin
  const keyBoard = keyboard.PAYMENT_CONFIRMATION_FOR_ADMIN_KEY_BOARD.map(
    (key) =>
      key.map((obj) => ({
        text: obj.text,
        callback_data: obj.callback_data.concat(`_${chatId}`),
      }))
  );

  // Send Keyboard to Admin to Update Status of payment
  botHelper.sendKeyboardToUser(
    process.env.MESSAGE_GROUP_CHAT_ID,
    messageToAdmin,
    keyBoard
  );

  // send message to User
  return botHelper.sendMessageToUser(
    chatId,
    "Thanks For Choosing US. Your investment is being processed. it will soon reflect in your dashboard"
  );
};
