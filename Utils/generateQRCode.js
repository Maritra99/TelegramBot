const QRCode = require("qrcode");
const handler = require("../BotCommands/handler");
const errorHandler = require("../BotCommands/errorHandler");
const JSONMessage = require("../Static/message");
const renderMessage = require("../Static/renderMessage");
const keyboard = require("../Static/keyBoard");

exports.sendUPIDetails = async (chatId, amount) => {
  const upiId = process.env.UPI_ID;
  const name = process.env.UPI_NAME || "12% Bot";

  try {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    const qrCodeBuffer = await QRCode.toBuffer(upiUrl);

    const paymentDetailsMessage = renderMessage(
      JSONMessage.PAYMENT_REQUEST_MESSAGE,
      {
        upiId,
        amount,
      }
    );

    const paymentConfirmationMessage =
      "✨ Once you have completed the transaction, please click on one of the buttons to confirm: 👉\n\n *Click ✅ Payment Done if payment is successful.* \n *Click ❌ Payment Not Done if payment is not completed.*\n\n Feel free to let me know if you face any issues!";

    handler.sendMessage(chatId, paymentDetailsMessage);
    handler.sendImage(chatId, qrCodeBuffer, JSONMessage.TEXT_WITH_QR);
    handler.sendInlineKeyboard(
      chatId,
      paymentConfirmationMessage,
      keyboard.PAYMENT_CONFIRMATION_KEY_BOARD
    );
  } catch (error) {
    errorHandler.handleError(
      chatId,
      "sendUPIDetails",
      error,
      "Sorry, there was an issue generating the payment details. Please try again."
    );
  }
};
