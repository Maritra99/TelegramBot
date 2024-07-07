const { saveMemberDataToDB } = require("../Model/userModel.js");
const keyboard = require("../keyBoard");
const JSONMessage = require("../message");
const bot = require("./createBot");
const { handleError } = require("./handleError");
const {
  handleCommands,
  getMessageDetails,
  handleMessage,
  checkMembership,
  handleWithoutMemberShip,
  showDashboardDetails,
} = require("./handleMessage");

bot.on("polling_error", (error) => {
  console.error(`Polling Error Occured: ${error.message}`, error);
  // process.exit(1);
});

bot.on("error", (error) => {
  console.error("Normal Error Occured: ", error);
  // process.exit(1);
});

bot.on("text", async (msg) => {
  const { chatId, messageText, name } = getMessageDetails(msg);
  try {
    const isMember = await checkMembership(chatId);

    if (!isMember) {
      return handleWithoutMemberShip(chatId);
    }

    await saveMemberDataToDB(chatId, name);

    if (messageText.startsWith("/")) {
      handleCommands(messageText.split("/")[1], chatId);
    } else {
      handleMessage(chatId, messageText);
    }
  } catch (error) {
    console.error("Error processing text message:", error.message);
    handleError(chatId, "Text Webhook", error);
  }
});

bot.on("sticker", (sticker) => {
  const { chatId } = sticker;
  try {
    handleMessage(chatId, sticker);
  } catch (error) {
    console.error("Error processing sticker:", error.message);
    handleError(chatId, "Sticker Webhook", error);
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const { message: messageObj, data } = callbackQuery;
  const chatId = messageObj.chat.id;
  let responseTextToSend = "";
  let keyboardToSend = [];
  try {
    switch (data) {
      case "dashboard":
        // responseTextToSend = "Showing dashboard...";
        // // Implement logic for dashboard action
        showDashboardDetails(chatId);
        break;
      case "faq":
        responseTextToSend = "Fetching FAQ...";
        // Implement logic for FAQ action
        break;
      case "privacy_policy":
        responseTextToSend = "Displaying Privacy Policy...";
        // Implement logic for Privacy Policy action
        break;
      default:
        responseTextToSend = JSONMessage.UNKNOWN_BUTTON;
        keyboardToSend = keyboard.START_MESSAGE_KEYBOARD;
    }

    // sendInlineKeyboard(chatId, responseTextToSend, keyboardToSend);
  } catch (error) {
    console.error("Error processing callback query:", error.message);
    handleError(chatId, "Callback Query", error);
  }
});
