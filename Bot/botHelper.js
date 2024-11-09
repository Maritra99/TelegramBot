const bot = require("./botConfig");

const botHelper = {};

botHelper.getChatId = (msg) => {
  return msg && msg.chat && msg.chat.id;
};

botHelper.getMessage = (msg) => {
  return msg && msg.text;
};

botHelper.sendMessage = (chatId, messageText, inlineKeyboard) => {
  return bot.sendMessage(chatId, messageText, {
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard?.reply_markup || undefined,
  });
};

module.exports = botHelper;
