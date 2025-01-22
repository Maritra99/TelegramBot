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

const callbackHandlers = {};

// Need to define method and UserState for any new callback. Rest is handled
callbackHandlers.callbacks = {
  start: async (chatId) => await start(chatId),
  dashboard: async (chatId) => await dashboard(chatId),
  view_plans: async (chatId) => await viewPlans(chatId),
  back_to_menu: async (chatId) => await backToMenu(chatId),
  select_plan_1: async (chatId) => await plan.handlePlan1Selection(chatId),
  select_plan_2: async (chatId) => await plan.handlePlan2Selection(chatId),
  select_plan_3: async (chatId) => await plan.handlePlan3Selection(chatId),
  restart_process: async (chatId) => await restart(chatId),
  confirm_amount: async (chatId, messageId) =>
    await confirmAmount(chatId, messageId),
  cancel_amount: async (chatId, messageId) =>
    await cancelAmount(chatId, messageId),
  payment_successful: async (chatId, messageId, userDetails) =>
    await paymentSuccess(chatId, messageId, userDetails),
  payment_failed: async (chatId, messageId) =>
    await paymentFailed(chatId, messageId),
};

callbackHandlers.handler = async (
  chatId,
  messageId,
  callbackData,
  userDetails
) => {
  if (userState[callbackData]) {
    await userStateModel.saveUserState(chatId, userState[callbackData]);
  } else {
    console.error(`User State Missing for ${data} and chatId: ${chatId}`);
  }

  return await callbackHandlers.callbacks[callbackData](
    chatId,
    messageId,
    userDetails
  );
};

module.exports = callbackHandlers;
