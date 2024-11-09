const bot = require("./botConfig");
const botHelper = require("./botHelper");
const commandHandler = require("../Handlers/commandHandler");
const messageHandler = require("../Handlers/messageHandler");

bot.on("message", (msg) => {
  const message = botHelper.getMessage(msg);
  const chatId = botHelper.getChatId(msg);

  if (message.startsWith("/")) {
    commandHandler(chatId, message);
  } else {
    messageHandler(chatId, message);
  }
});
