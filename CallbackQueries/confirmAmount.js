const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const dashBoard = require("./dashboard");
const userState = require("../Static/userState");
const generateAndSendQRCode = require("../Utils/generateAndSendQRCode");
const message = require("../Static/message");
const renderMessage = require("../Utils/renderMessage");
const keyboard = require("../Static/Keyboard");
const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");

module.exports = async ({ userChatId, messageId, paymentId }) => {
  botHelper.deleteInlineKeyboard(userChatId, messageId);

  const transactionData = await transactionModel.fetchTransaction(
    userChatId,
    paymentId
  );

  if (!transactionData[0] || !transactionData[0].amount) {
    await botHelper.sendMessageToUser(
      userChatId,
      message.TRANSACTION_NOT_FOUND
    );

    const messageToAdmin = `Error in Finding payment in Confirm Amount\nuserChatId: ${userChatId}\nmessageId: ${messageId}\npaymentId: ${paymentId}`;
    notifyErrorToAdmin(messageToAdmin);

    return await dashBoard({
      userChatId,
      userState: userState["transaction_not_found"],
    });
  }

  botHelper.sendMessageToUser(
    userChatId,
    renderMessage(message.PAYMENT_REQUEST_MESSAGE, {
      upiId: process.env.UPI_ID,
      amount: transactionData[0].amount,
    })
  );

  await generateAndSendQRCode(
    userChatId,
    transactionData[0].amount,
    botHelper.sendImageToUser
  );

  const keyBoardToSendToUser = keyboard.PAYMENT_CONFIRMATION_KEY_BOARD.map(
    (key) =>
      key.map((obj) => ({
        text: obj.text,
        callback_data: obj.callback_data.concat(
          `_${transactionData[0].transactionId}`
        ),
      }))
  );

  return await botHelper.sendKeyboardToUser(
    userChatId,
    "Select Payment Status",
    keyBoardToSendToUser
  );
};
