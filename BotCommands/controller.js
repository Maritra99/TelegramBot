const bot = require("./createBot");
const {
  handleCommands,
  sendMessage,
  getMessageDetails,
} = require("./handleMessage");

bot.on("text", (msg) => {
  const { chatId, messageText } = getMessageDetails(msg);

  if (messageText.startsWith("/")) {
    handleCommands(messageText.split("/")[1], chatId);
  }
});

bot.on("sticker", (sticker) => {
  sendMessage(chatId, sticker);
});
