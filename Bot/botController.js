const bot = require("./botConfig");
const commandHandler = require("../Handlers/commandHandler");
const messageHandler = require("../Handlers/messageHandler");
const extractDetails = require("../Utils/extractDetails");
const memberShipHelper = require("../Utils/memberShipHelper");
const botHelper = require("./botHelper");
const catchAsyncError = require("../Error/catchAsyncError");
const callbackHandlers = require("../Utils/callbackhandlers");
const userState = require("../Static/userState");
const userStateModel = require("../Model/userStateModel");

bot.on(
  "text",
  catchAsyncError(async (msg) => {
    const message = extractDetails.getMessage(msg);
    const chatId = extractDetails.getChatId(msg);

    const isMember = await memberShipHelper.checkMemberShip(chatId);

    if (!isMember) {
      return memberShipHelper.handleWithoutMemberShip(chatId);
    }

    if (message.startsWith("/")) {
      commandHandler(chatId, message);
    } else {
      messageHandler(chatId, message);
    }
  })
);

bot.on(
  "callback_query",
  catchAsyncError(async (callbackQuery) => {
    const { message: messageObj, data } = callbackQuery;
    const chatId = extractDetails.getChatId(messageObj);

    const isMember = await memberShipHelper.checkMemberShip(chatId);

    if (!isMember) {
      return memberShipHelper.handleWithoutMemberShip(chatId);
    }

    if (userState[data]) {
      await userStateModel.saveUserState(chatId, userState[data]);
    } else {
      console.error(`User State Missing for ${data} and chatId: ${chatId}`);
    }

    if (callbackHandlers.callbacks[data]) {
      await callbackHandlers.handler(chatId, data);
    } else {
      await botHelper.sendMessageToUser(
        chatId,
        "Oops! I didn't recognize that action. Please try again. 🤔"
      );
    }

    await botHelper.answerCallbackQuery(callbackQuery.id);
  })
);

bot.on("polling_error", (error) => {
  console.error(`Polling Error Occured: ${JSON.stringify(error)}`);
});

bot.on("error", (error) => {
  console.error(`Normal Error Occured: ${JSON.stringify(error)}`);
});
