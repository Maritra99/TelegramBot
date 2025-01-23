const botHelper = require("../Bot/botHelper");

module.exports = ({ userChatId }) => {
  const helpText = `
  Available commands:
  /start - Start the bot
  /help - List available commands
  `;
  return botHelper.sendMessageToUser(userChatId, helpText);
};
