const bot = require("./botConfig");
const commandHandler = require("../Handlers/commandHandler");
const messageHandler = require("../Handlers/messageHandler");
const extractDetails = require("../Utils/extractDetails");
const memberShipHelper = require("../Utils/memberShipHelper");

bot.on("message", async (msg) => {
  const message = extractDetails.getMessage(msg);
  const chatId = extractDetails.getChatId(msg);

  const isMember = await memberShipHelper.checkMemberShip(chatId);

  if (!isMember) {
    return memberShipHelper.handleWithoutMemberShip(chatId);
  }

  if (message.startsWith("/")) {
    commandHandler(chatId, message);
  } else {
    messageHandler(chatId, message);
  }
});
