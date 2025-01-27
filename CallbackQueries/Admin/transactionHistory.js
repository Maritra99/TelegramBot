const botHelper = require("../../Bot/botHelper");
const userStateModel = require("../../Model/userStateModel");
const { PaymentStatus } = require("../../Model/schema");
const transactionsModel = require("../../Model/transactionModel");
const keyboard = require("../../Static/Keyboard");

module.exports = async ({ userChatId, userState }) => {
  // Save user state if provided
  if (userState) {
    await userStateModel.saveUserState(userChatId, userState);
  }

  // Fetch active investments for the user
  const userTransactions = await transactionsModel.getActiveInvestments(
    userChatId
  );

  if (
    !userTransactions ||
    !userTransactions.transactions ||
    !userTransactions.transactions.length
  ) {
    const noTransactionMessage =
      `🔍 <b>No Transactions Found</b>\n\n` +
      `💼 Start investing now to build your portfolio! 🚀\n` +
      `Use <b>View Plans</b> to explore options.\n`;

    return botHelper.sendKeyboardToUser(
      userChatId,
      noTransactionMessage,
      keyboard.DASHBOARD_KEYBOARD
    );
  }

  // Categorize transactions
  const investments = {
    active: [],
    pending: [],
    failed: [],
  };

  userTransactions.transactions.forEach((transaction) => {
    switch (transaction.adminPaymentState) {
      case PaymentStatus.SUCCESS:
        investments.active.push(transaction);
        break;
      case PaymentStatus.PENDING:
        investments.pending.push(transaction);
        break;
      case PaymentStatus.FAILED:
        investments.failed.push(transaction);
        break;
    }
  });

  // Helper function to format transaction details in a card layout
  const formatTransactions = (transactions, header, icon) => {
    if (!transactions.length) return "";
    let formattedMessage = `<b>${icon} ${header}</b>\n`;

    formattedMessage += `<i>---------------------------------------------</i>\n`;

    transactions.forEach((investment) => {
      formattedMessage += `<b>🔹 Txn Id:</b> <code>${
        investment.transactionId
      }</code>\n<b>📋 Plan:</b> ${investment.plan.name}\n<b>💰 Interest:</b> ${
        investment.plan.interest
      }%\n<b>⏳ Duration:</b> ${
        investment.plan.duration
      } days\n<b>💵 Amount:</b> ₹${
        investment.amount
      } INR\n<b>📅 Time:</b> ${new Date(
        investment.transactionTime
      ).toLocaleString()}\n\n`;
    });

    return formattedMessage;
  };

  // Generate transaction history
  const message =
    formatTransactions(investments.active, "Active Investments", "✅") +
    formatTransactions(investments.pending, "Pending Investments", "⏳") +
    formatTransactions(investments.failed, "Failed Investments", "❌");

  // Send the transaction history to the user
  await botHelper.sendKeyboardToUser(
    userChatId,
    message.trim(),
    keyboard.DASHBOARD_KEYBOARD
  );
};
