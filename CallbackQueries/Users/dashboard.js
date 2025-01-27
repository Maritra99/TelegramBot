const botHelper = require("../../Bot/botHelper");
const userStateModel = require("../../Model/userStateModel");
const { PaymentStatus } = require("../../Model/schema");
const transactionsModel = require("../../Model/transactionModel");
const keyboard = require("../../Static/Keyboard");
const renderMessage = require("../../Utils/renderMessage");
const message = require("../../Static/message");

module.exports = async ({ userChatId, userState }) => {
  // Save user state if provided
  if (userState) {
    await userStateModel.saveUserState(userChatId, userState);
  }

  // Fetch active investments for the user
  const userTransactions = await transactionsModel.getActiveInvestments(
    userChatId
  );

  // Initialize main message
  const initialMessage = message.DASHBOARD_MESSAGE;

  // If no transactions are found, notify the user
  if (
    !userTransactions ||
    !userTransactions.transactions ||
    !userTransactions.transactions.length
  ) {
    const noInvestmentMessage = renderMessage(initialMessage, {
      active: "None",
      pending: "None",
      failed: "None",
    });

    return botHelper.sendKeyboardToUser(
      userChatId,
      noInvestmentMessage,
      keyboard.DASHBOARD_KEYBOARD
    );
  }

  // Categorize transactions based on admin payment state
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

  // Calculate total investment values
  const totalActiveInvestment = investments.active.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalPendingInvestment = investments.pending.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalFailedInvestment = investments.failed.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const investmentDetails = renderMessage(initialMessage, {
    active: `₹${totalActiveInvestment} INR`,
    pending: `₹${totalPendingInvestment} INR`,
    failed: `₹${totalFailedInvestment} INR`,
  });

  // Send the final message to the user
  await botHelper.sendKeyboardToUser(
    userChatId,
    investmentDetails.trim(),
    keyboard.DASHBOARD_KEYBOARD
  );
};
