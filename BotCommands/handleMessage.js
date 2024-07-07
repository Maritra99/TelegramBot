const keyboard = require("../keyBoard");
const JSONMessage = require("../message");
const bot = require("./createBot");

const sendMessage = (chatId, messageText, inlineKeyboard) => {
  bot.sendMessage(chatId, messageText, inlineKeyboard);
};

const getMessageDetails = (msg) => {
  const {
    chat: { id: chatId },
    text: messageText,
    from: { id: userId },
  } = msg;
  return { userId, chatId, messageText };
};

const checkMembership = async (userId) => {
  try {
    const chatMember = await bot.getChatMember(
      process.env.CHANNEL_USERNAME,
      userId
    );
    return ["member", "administrator", "creator"].includes(chatMember.status);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const sendInlineKeyboard = (chatId, messageText, buttons) => {
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
  sendMessage(chatId, messageText, inlineKeyboard);
};

const handleStartMessage = (chatId) => {
  return sendInlineKeyboard(
    chatId,
    JSONMessage.START_MESSAGE,
    keyboard.START_MESSAGE_KEYBOARD
  );
};

const handleCommands = (command, chatId) => {
  switch (command) {
    case "start":
      handleStartMessage(chatId);
      break;

    default:
      sendMessage(chatId, "Unknown Command For Me");
      break;
  }
};

const handleMessage = (chatId, messageText) => {
  sendMessage(chatId, messageText);
};

module.exports = {
  sendMessage,
  getMessageDetails,
  handleCommands,
  handleMessage,
  checkMembership,
  sendInlineKeyboard,
};
