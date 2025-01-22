const QRCode = require("qrcode");
const fs = require("fs");

module.exports = async (chatId, amount, sendImageFunction) => {
  const upiPaymentURL = `upi://pay?pa=${process.env.UPI_ID}&pn=${process.env.UPI_NAME}&am=${amount}&cu=INR`;

  const qrFilePath = `payment-qr-${chatId}.png`;

  await QRCode.toFile(qrFilePath, upiPaymentURL);

  await sendImageFunction(chatId, qrFilePath);

  fs.unlinkSync(qrFilePath);
};
