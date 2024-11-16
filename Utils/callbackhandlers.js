const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const catchAsyncError = require("../Error/catchAsyncError");

const callbackHandlers = {};

callbackHandlers.callbacks = {
  start: async (chatId) => {
    await botHelper.sendMessageToUser(
      chatId,
      "Welcome to the 12% Interest Bot! 🌟"
    );
  },
  dashboard: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "📊 Here's your dashboard...");
  },
  back_to_menu: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "Returning to the main menu. 🔙");
  },
  select_plan_1: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "Selecting Plan 1");
  },
  select_plan_2: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "Selecting Plan 2");
  },
  select_plan_3: async (chatId) => {
    await botHelper.sendMessageToUser(chatId, "Selecting Plan 3");
  },
};

callbackHandlers.handler = catchAsyncError(async (chatId, callbackData) => {
  await userStateModel.saveUserState(chatId, callbackData);
  return await callbackHandlers.callbacks[callbackData](chatId);
});

module.exports = callbackHandlers;
