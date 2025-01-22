const botHelper = require("../Bot/botHelper");
const { PaymentStatus } = require("../Model/schema");
const transactionModel = require("../Model/transactionModel");
const message = require("../Static/message");
const generatePlanData = require("../Utils/generatePlanData");

const handlePlans = {};

const handlePlanSelection = async (planName, chatId) => {
  const messageToSend = message.ASK_AMOUNT_MESSAGE;

  const planObj = generatePlanData(planName);

  const initialTransaction = {
    plan: planObj,
    userPaymentState: PaymentStatus.PENDING,
    adminPaymentState: PaymentStatus.PENDING,
  };

  await transactionModel.updateTransaction(chatId, initialTransaction);

  return botHelper.sendMessageToUser(chatId, messageToSend);
};

handlePlans.handlePlan1Selection = async (chatId) => {
  return await handlePlanSelection("Plan 1", chatId);
};

handlePlans.handlePlan2Selection = async (chatId) => {
  return await handlePlanSelection("Plan 2", chatId);
};

handlePlans.handlePlan3Selection = async (chatId) => {
  return await handlePlanSelection("Plan 3", chatId);
};

module.exports = handlePlans;
