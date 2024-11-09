const botHelper = require("../Bot/botHelper");
const formatError = (err, chatId, messageSentToBot) => ({
  Error: err,
  Message: err.message,
  Stack: err.stack,
  Details: err.details,
  ChatID: chatId,
  MessageSentToBot: messageSentToBot,
});

module.exports = (error, chatId, messageSentToBot) => {
  const adminChatId = process.env.ADMIN_CHAT_ID;

  botHelper.sendMessageToUser(
    adminChatId,
    formatError(error, chatId, messageSentToBot)
  );

  const errorMessageForUser =
    "Oops! Something went wrong. Please try again later.";

  return botHelper.sendMessageToUser(chatId, errorMessageForUser);
};
