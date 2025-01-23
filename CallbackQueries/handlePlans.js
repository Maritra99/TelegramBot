const botHelper = require("../Bot/botHelper");
const { PaymentStatus } = require("../Model/schema");
const transactionModel = require("../Model/transactionModel");
const message = require("../Static/message");
const generatePlanData = require("../Utils/generatePlanData");
const generateTransactionId = require("../Utils/generateTransactionId");

const handlePlans = {};

const handlePlanSelection = async (planName, userChatId) => {
  const messageToSend = message.ASK_AMOUNT_MESSAGE;

  const planObj = generatePlanData(planName);

  const initialTransaction = {
    transactionId: generateTransactionId(userChatId),
    plan: planObj,
    userPaymentState: PaymentStatus.PENDING,
    adminPaymentState: PaymentStatus.PENDING,
  };

  await transactionModel.saveTransaction(userChatId, initialTransaction);

  return botHelper.sendMessageToUser(userChatId, messageToSend);
};

handlePlans.handlePlan1Selection = async ({ userChatId }) => {
  return await handlePlanSelection("Plan 1", userChatId);
};

handlePlans.handlePlan2Selection = async ({ userChatId }) => {
  return await handlePlanSelection("Plan 2", userChatId);
};

handlePlans.handlePlan3Selection = async ({ userChatId }) => {
  return await handlePlanSelection("Plan 3", userChatId);
};

module.exports = handlePlans;
