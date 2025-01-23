const bot = require("../Bot/botConfig");
const keyboard = require("../Static/Keyboard");
const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");

module.exports = async (error, chatId, messageSentToBot) => {
  console.error("Error Occured: ", JSON.stringify(error));

  const messagetoAdmin = `In GlobalError Handler.\n\nMessage: ${JSON.stringify(
    error && error.message
  )}\n\nError: ${JSON.stringify(error)}\n\n chatId: ${JSON.stringify(
    chatId
  )}\n\n messageSentToBot: ${JSON.stringify(messageSentToBot)}`;

  notifyErrorToAdmin(messagetoAdmin);

  const errorMessageForUser =
    "Oops! Something went wrong. Please try again later.";

  return bot.sendMessage(
    chatId,
    errorMessageForUser,
    keyboard.RESTART_KEYBOARD
  );
};
