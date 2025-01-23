const userStateModel = require("../Model/userStateModel.js");
const start = require("../Command/start.js");
const dashboard = require("../CallbackQueries/dashboard.js");
const viewPlans = require("../CallbackQueries/viewPlans.js");
const plan = require("../CallbackQueries/handlePlans.js");
const backToMenu = require("../CallbackQueries/backToMenu.js");
const restart = require("../CallbackQueries/restart.js");
const userState = require("../Static/userState.js");
const confirmAmount = require("../CallbackQueries/confirmAmount.js");
const cancelAmount = require("../CallbackQueries/cancelAmount.js");
const paymentSuccess = require("../CallbackQueries/paymentSuccessful.js");
const paymentFailed = require("../CallbackQueries/paymentFailed.js");
const paymentSuccessAdmin = require("../CallbackQueries/paymentSuccessfulAdmin.js");
const paymentFailedAdmin = require("../CallbackQueries/paymentFailedAdmin.js");

const callbackHandlers = {};

// Need to define method and UserState for any new callback. Rest is handled
callbackHandlers.callbacks = {
  //User Callbacks
  start: async (args) => await start(args),
  dashboard: async (args) => await dashboard(args),
  view_plans: async (args) => await viewPlans(args),
  back_to_menu: async (args) => await backToMenu(args),
  select_plan_1: async (args) => await plan.handlePlan1Selection(args),
  select_plan_2: async (args) => await plan.handlePlan2Selection(args),
  select_plan_3: async (args) => await plan.handlePlan3Selection(args),
  restart_process: async (args) => await restart(args),
  confirm_amount: async (args) => await confirmAmount(args),
  cancel_amount: async (args) => await cancelAmount(args),
  payment_successful: async (args) => await paymentSuccess(args),
  payment_failed: async (args) => await paymentFailed(args),
};

callbackHandlers.AdminCallbacks = {
  //Admin Callbacks
  admin_payment_successful: async (args) => await paymentSuccessAdmin(args),
  admin_payment_failed: async (args) => await paymentFailedAdmin(args),
};

callbackHandlers.handler = async (args) => {
  const { userChatId, callbackDataForUser, data } = args;

  if (userState[callbackDataForUser]) {
    await userStateModel.saveUserState(
      userChatId,
      userState[callbackDataForUser]
    );
  } else {
    console.error(`User State Missing for ${data} and chatId: ${userChatId}`);
  }

  return await callbackHandlers.callbacks[callbackDataForUser](args);
};

callbackHandlers.adminHandler = async (args) => {
  const { callbackDataForAdmin } = args;
  return await callbackHandlers.AdminCallbacks[callbackDataForAdmin](args);
};

module.exports = callbackHandlers;
