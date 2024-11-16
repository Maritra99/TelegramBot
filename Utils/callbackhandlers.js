const userStateModel = require("../Model/userStateModel");
const start = require("../Command/start");
const dashboard = require("../CallbackQueries/dashboard");
const viewPlans = require("../CallbackQueries/viewPlans");
const plan = require("../CallbackQueries/handlePlans");
const backToMenu = require("../CallbackQueries/backToMenu.js");
const restart = require("../CallbackQueries/restart");
const userState = require("../Static/userState.js");

const callbackHandlers = {};

callbackHandlers.callbacks = {
  start: async (chatId) => await start(chatId),
  dashboard: async (chatId) => await dashboard(chatId),
  view_plans: async (chatId) => await viewPlans(chatId),
  back_to_menu: async (chatId) => await backToMenu(chatId),
  select_plan_1: async (chatId) => await plan.handlePlan1Selection(chatId),
  select_plan_2: async (chatId) => await plan.handlePlan2Selection(chatId),
  select_plan_3: async (chatId) => await plan.handlePlan3Selection(chatId),
  restart_process: async (chatId) => await restart(chatId),
};

callbackHandlers.handler = async (chatId, callbackData) => {
  if (userState[callbackData]) {
    await userStateModel.saveUserState(chatId, userState[callbackData]);
  } else {
    console.error(`User State Missing for ${data} and chatId: ${chatId}`);
  }

  return await callbackHandlers.callbacks[callbackData](chatId);
};

module.exports = callbackHandlers;
