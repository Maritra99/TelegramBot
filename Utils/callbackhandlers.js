const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const start = require("../Command/start");
const viewPlans = require("../CallbackQueries/viewPlans");
const plan = require("../CallbackQueries/handlePlans");

const callbackHandlers = {};

callbackHandlers.callbacks = {
  start: async (chatId) => await start(chatId),
  dashboard: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "📊 Here's your dashboard...");
  },
  view_plans: async (chatId) => viewPlans(chatId),
  back_to_menu: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "Returning to the main menu. 🔙");
  },
  select_plan_1: async (chatId) => plan.handlePlan1Selection(chatId),
  select_plan_2: async (chatId) => plan.handlePlan2Selection(chatId),
  select_plan_3: async (chatId) => plan.handlePlan3Selection(chatId),
};

callbackHandlers.handler = async (chatId, callbackData) => {
  await userStateModel.saveUserState(chatId, callbackData);
  return await callbackHandlers.callbacks[callbackData](chatId);
};

module.exports = callbackHandlers;
