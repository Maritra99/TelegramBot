const { saveMemberDataToDB } = require("../Model/userModel.js");
const bot = require("./createBot");
const { handleError } = require("./errorHandler.js");
const handler = require("./handler");

bot.on("polling_error", (error) => {
  console.error(`Polling Error Occured: ${error.message}`, error);
  // process.exit(1);
});

bot.on("error", (error) => {
  console.error("Normal Error Occured: ", error);
  // process.exit(1);
});

bot.on("text", async (msg) => {
  const { chatId, messageText, name } = handler.getMessageDetails(msg);
  try {
    const isMember = await handler.checkMembership(chatId);

    if (!isMember) {
      return handler.handleWithoutMemberShip(chatId);
    }

    await saveMemberDataToDB(chatId, name);

    if (messageText.startsWith("/")) {
      handler.handleCommands(messageText.split("/")[1], chatId);
    } else {
      handler.handleMessage(chatId, messageText);
    }
  } catch (error) {
    handleError(chatId, "Text Webhook", error);
  }
});

bot.on("sticker", (sticker) => {
  const { chatId } = sticker;
  try {
    handler.handleMessage(chatId, sticker);
  } catch (error) {
    console.error("Error processing sticker:", error.message);
    handleError(chatId, "Sticker Webhook", error);
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const { message: messageObj, data } = callbackQuery;
  const chatId = messageObj.chat.id;
  try {
    switch (data) {
      case "dashboard":
        handler.showDashboardDetails(chatId);
        break;
      case "view_plans":
        handler.showPlanDetails(chatId);
        break;
      case "faq":
        break;
      case "privacy_policy":
        break;
      case "select_plan_1":
        handler.handlePlan1Selection(chatId);
        break;
      case "select_plan_2":
        handler.handlePlan2Selection(chatId);
        break;
      case "select_plan_3":
        handler.handlePlan3Selection(chatId);
        break;
      case "invest_plan_1":
        handler.investInPlan1(chatId);
        break;
      case "invest_plan_2":
        handler.investInPlan2(chatId);
        break;
      case "invest_plan_3":
        handler.investInPlan3(chatId);
        break;
      default:
        throw Error("Unknown Callback Query");
    }
  } catch (error) {
    console.error("Error processing callback query:", error.message);
    handleError(chatId, "Callback Query", error);
  }
});
