const botHelper = require("../Bot/botHelper");

module.exports = (chatId) => {
  const helpText = `
  Available commands:
  /start - Start the bot
  /help - List available commands
  `;
  return botHelper.sendMessage(chatId, helpText);
};
