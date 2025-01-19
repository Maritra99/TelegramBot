const QRCode = require("qrcode");
const fs = require("fs");
// const botHelper = require("../Bot/botHelper");

module.exports = async (chatId, amount, sendImageFunction) => {
  // UPI Payment Details (or other payment formats)
  const upiPaymentURL = `upi://pay?pa=${process.env.UPI_ID}&pn=${process.env.UPI_NAME}&am=${amount}&cu=INR`;

  const qrFilePath = `payment-qr-${chatId}.png`;

  // Generate QR Code and save it as a file
  await QRCode.toFile(qrFilePath, upiPaymentURL);

  await sendImageFunction(
    chatId,
    qrFilePath,
    "Scan this QR to make a payment."
  );

  // Clean up the file after sending
  fs.unlinkSync(qrFilePath);
};
