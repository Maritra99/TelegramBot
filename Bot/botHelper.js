const bot = require("./botConfig");

const botHelper = {};

botHelper.isUserAlreadyMember = async (channelId, userId) => {
  return await bot.getChatMember(channelId, userId);
};

botHelper.sendMessageToUser = async (chatId, messageText, inlineKeyboard) => {
  return await bot.sendMessage(chatId, messageText, {
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard?.reply_markup || undefined,
  });
};

botHelper.sendMessageToUser = async (chatId, messageText, inlineKeyboard) => {
  return bot.sendMessage(chatId, messageText, {
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard?.reply_markup || undefined,
  });
};

module.exports = botHelper;
