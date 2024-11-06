const userModel = require("../Model/userModel.js");
const { userState } = require("../Static/userState.js");
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

    await userModel.saveMemberDataToDB(chatId, name);

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

  if (userState[data]) {
    userModel.saveUserState(chatId, userState[data]);
  } else {
    console.error("User State Missing for ", data);
  }

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
      case "back_to_menu":
        break;
      case "back_to_plans":
        break;
      case "confirm_amount":
        handler.handleConfirmAmount(chatId);
        break;
      case "cancel_amount":
        break;
      case "restart_process":
        handler.handleRestart(chatId);
        break;
      case "payment_successful":
        break;
      case "payment_failed":
        break;
      case "settings":
        break;
      case "contact_us":
        break;
      default:
        throw Error("Unknown Callback Query");
    }
  } catch (error) {
    console.error("Error processing callback query:", error.message);
    handleError(chatId, "Callback Query", error);
  }
});
