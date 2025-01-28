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
      keyboard.TRANSACTION_HISTORY
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
      if (investment.transactionId) {
        formattedMessage += `<b>🔹 Txn Id:</b> <code>${investment.transactionId}</code>\n`;
      }
      if (investment.plan && investment.plan.name) {
        formattedMessage += `<b>📋 Plan:</b> ${investment.plan.name}\n`;
      }
      if (investment.plan && investment.plan.interest) {
        formattedMessage += `<b>💰 Interest:</b> ${investment.plan.interest}%\n`;
      }
      if (investment.plan && investment.plan.duration) {
        formattedMessage += `<b>⏳ Duration:</b> ${investment.plan.duration} days\n`;
      }
      if (investment.amount) {
        formattedMessage += `<b>💵 Amount:</b> ₹${investment.amount} INR\n`;
      }
      if (investment.transactionTime) {
        formattedMessage += `<b>📅 Time:</b> ${new Date(
          investment.transactionTime
        ).toLocaleString()}\n`;
      }
      if (investment.redemptionTime) {
        formattedMessage += `<b>⏳ Maturity:</b> ${new Date(
          investment.redemptionTime
        ).toLocaleString()}\n\n`;
      }
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
    keyboard.TRANSACTION_HISTORY
  );
};
