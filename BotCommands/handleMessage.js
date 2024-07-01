const bot = require("./createBot");

exports.sendMessage = sendMessage = (chatId, messageText) => {
  bot.sendMessage(chatId, messageText);
};

exports.getMessageDetails = getMessageDetails = (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  return { chatId, messageText };
};

exports.handleCommands = (command, chatId) => {
  switch (command) {
    case "start":
      this.sendMessage(chatId, "Welcome to the bot123!");
      break;

    default:
      this.sendMessage(chatId, "Unknown Command For Me");
      break;
  }
};
