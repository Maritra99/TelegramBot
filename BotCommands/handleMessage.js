const keyboard = require("../keyBoard");
const JSONMessage = require("../message");
const bot = require("./createBot");

const sendMessage = (chatId, messageText, inlineKeyboard) => {
  bot.sendMessage(chatId, messageText, inlineKeyboard);
};

const getMessageDetails = (msg) => {
  const {
    chat: { id: chatId, first_name, last_name },
    text: messageText,
  } = msg;
  return { chatId, messageText, name: first_name + " " + last_name };
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

const handleWithoutMemberShip = () => {
  return sendInlineKeyboard(chatId, JSONMessage.JOIN_CHANNEL, [
    [
      {
        text: "Join Channel",
        url: `https://t.me/${process.env.CHANNEL_USERNAME.replace("@", "")}`,
      },
    ],
  ]);
};

const showDashboardDetails = (chatId) => {
  const message =
    "🌟 Welcome to the 12% Interest Bot! 🚀\n\nHere's your current investment overview:\n\n-Total Invested Amount: 10000 💵\n- Current Balance: 10020 💰\n- Accrued Interest: 20 📈\n\nFeel free to explore your investments and manage them efficiently with our bot. If you have any questions or need assistance, just type 'Help'!";
  const keyBoard = [];

  sendInlineKeyboard(chatId, message, keyBoard);
};

module.exports = {
  sendMessage,
  getMessageDetails,
  handleCommands,
  handleMessage,
  checkMembership,
  sendInlineKeyboard,
  handleWithoutMemberShip,
  showDashboardDetails,
};
