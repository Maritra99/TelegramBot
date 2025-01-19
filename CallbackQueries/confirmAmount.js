const botHelper = require("../Bot/botHelper");
const transactionModel = require("../Model/transactionModel");
const dashBoard = require("./dashboard");
const userState = require("../Static/userState");
const generateAndSendQRCode = require("../Utils/generateAndSendQRCode");

module.exports = async (chatId) => {
  const transactionData = await transactionModel.fetchTransactionByChatId(
    chatId
  );

  if (!transactionData) {
    await botHelper.sendMessageToUser(chatId, "transacTion Not Found");
    return await dashBoard(chatId, userState["transaction_not_found"]);
  }

  return await generateAndSendQRCode(
    chatId,
    transactionData.amount,
    botHelper.sendImageToUser
  );
};
