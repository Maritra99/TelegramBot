const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const keyboard = require("../Static/Keyboard");

module.exports = async (chatId, messageId, userDetails) => {
  botHelper.deleteInlineKeyboard(chatId, messageId);

  await transactionModel.updateTransaction(chatId, {
    transactionTime: Date.now(),
  });

  const messageToAdmin = `
    **Payment Completed**
    **User :** ${userDetails.first_name} ${userDetails.last_name}
    **Username :** ${userDetails.username}
    **Id :** ${userDetails.id} 
  `;

  botHelper.sendKeyboardToUser(
    process.env.MESSAGE_GROUP_CHAT_ID,
    messageToAdmin,
    keyboard.PAYMENT_CONFIRMATION_FOR_ADMIN_KEY_BOARD
  );

  return botHelper.sendMessageToUser(
    chatId,
    "Thanks For Choosing US. Your investment is being processed. it will soon reflect in your dashboard"
  );
};
