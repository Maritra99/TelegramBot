const userStateModel = require("../Model/userStateModel.js");
const start = require("../Command/start.js");
const dashboard = require("../CallbackQueries/Users/dashboard.js");
const viewPlans = require("../CallbackQueries/Users/viewPlans.js");
const plan = require("../CallbackQueries/Users/handlePlans.js");
const backToMenu = require("../CallbackQueries/Users/backToMenu.js");
const restart = require("../CallbackQueries/Users/restart.js");
const userState = require("../Static/userState.js");
const confirmAmount = require("../CallbackQueries/Users/confirmAmount.js");
const cancelAmount = require("../CallbackQueries/Users/cancelAmount.js");
const paymentSuccess = require("../CallbackQueries/Users/paymentSuccessful.js");
const paymentFailed = require("../CallbackQueries/Users/paymentFailed.js");
const paymentSuccessAdmin = require("../CallbackQueries/Admin/paymentSuccessfulAdmin.js");
const paymentFailedAdmin = require("../CallbackQueries/Admin/paymentFailedAdmin.js");
const transactionHistory = require("../CallbackQueries/Users/transactionHistory.js");
const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin.js");

const callbackHandlers = {};

// Need to define method and UserState for any new callback. Rest is handled.
// Callback sould be of maximum 2 words
callbackHandlers.callbacks = {
  //User Callbacks
  start: async (args) => await start(args),
  dashboard: async (args) => await dashboard(args),
  view_plans: async (args) => await viewPlans(args),
  back_menu: async (args) => await backToMenu(args),
  plan_one: async (args) => await plan.handlePlan1Selection(args),
  plan_two: async (args) => await plan.handlePlan2Selection(args),
  plan_three: async (args) => await plan.handlePlan3Selection(args),
  restart_process: async (args) => await restart(args),
  confirm_amount: async (args) => await confirmAmount(args),
  cancel_amount: async (args) => await cancelAmount(args),
  payment_successful: async (args) => await paymentSuccess(args),
  payment_failed: async (args) => await paymentFailed(args),
  transaction_history: async (args) => await transactionHistory(args),
  // bonus_status,
  // referral_stats,
};

callbackHandlers.AdminCallbacks = {
  //Admin Callbacks
  approve_payment: async (args) => await paymentSuccessAdmin(args),
  reject_payment: async (args) => await paymentFailedAdmin(args),
};

callbackHandlers.handler = async (args) => {
  const { userChatId, callbackDataForUser } = args;

  if (userState[callbackDataForUser]) {
    await userStateModel.saveUserState(
      userChatId,
      userState[callbackDataForUser]
    );
  } else {
    notifyErrorToAdmin(
      `User State Missing for ${callbackDataForUser} and chatId: ${userChatId}`
    );
  }

  return await callbackHandlers.callbacks[callbackDataForUser](args);
};

callbackHandlers.adminHandler = async (args) => {
  const { callbackDataForAdmin } = args;
  return await callbackHandlers.AdminCallbacks[callbackDataForAdmin](args);
};

module.exports = callbackHandlers;
