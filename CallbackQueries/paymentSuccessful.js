const botHelper = require("../Bot/botHelper");
const { PaymentStatus } = require("../Model/schema");
const transactionModel = require("../Model/transactionModel");
const keyboard = require("../Static/Keyboard");

module.exports = async ({ userChatId, messageId, userDetails }) => {
  // Once User clicks keyboard delete that
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  // Update Transaction Time
  const updatedTransaction = await transactionModel.updateTransaction(
    userChatId,
    {
      userPaymentState: PaymentStatus.SUCCESS,
      transactionTime: Date.now(),
    }
  );

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
        callback_data: obj.callback_data.concat(`_${userChatId}`),
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
    userChatId,
    "Thanks For Choosing US. Your investment is being processed. it will soon reflect in your dashboard"
  );
};
