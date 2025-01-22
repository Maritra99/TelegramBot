const bot = require("../Bot/botConfig");
const keyboard = require("../Static/Keyboard");
const formatError = (err, chatId, messageSentToBot) => ({
  Error: err,
  Message: err.message,
  Stack: err.stack,
  Details: err.details,
  ChatID: chatId,
  MessageSentToBot: messageSentToBot,
});

module.exports = async (error, chatId, messageSentToBot) => {
  console.error(
    "Error Occured: ",
    JSON.stringify(formatError(error, chatId, messageSentToBot))
  );

  const adminChatId = process.env.ERROR_GROUP_CHAT_ID;
  if (adminChatId) {
    bot.sendMessage(
      adminChatId,
      JSON.stringify(formatError(error, chatId, messageSentToBot) || "")
    );
  }

  const errorMessageForUser =
    "Oops! Something went wrong. Please try again later.";

  return bot.sendMessage(
    chatId,
    errorMessageForUser,
    keyboard.RESTART_KEYBOARD
  );
};
