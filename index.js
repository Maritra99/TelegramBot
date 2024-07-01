const dotenv = require("dotenv");
const app = require("express")();
const TelegramBot = require("node-telegram-bot-api");

const PORT = process.env.PORT || 8081;

dotenv.config({ path: "./.env" });

const token = process.env.BOT_API;
const bot = new TelegramBot(token, { polling: true });

bot.on("text", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    bot.sendMessage(chatId, "Welcome to the bot!");
  } else if (messageText.startsWith("/")) {
    bot.sendMessage(chatId, "Command Not Found");
  } else {
    bot.sendMessage(chatId, messageText);
  }
});

bot.on("sticker", (sticker) => {
  bot.sendMessage(chatId, sticker);
});

app.get("/", (req, res) => {
  try {
    res.send("Bot is Up and Running");
  } catch (error) {
    res.status(500).send("Something is Fissy!!!!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
