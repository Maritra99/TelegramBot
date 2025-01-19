const bot = require("./botConfig");

const botHelper = {};

botHelper.isUserAlreadyMember = async (CHANNEL_USERNAME, chatId) => {
  try {
    return await bot.getChatMember(CHANNEL_USERNAME, chatId);
  } catch (error) {
    console.error(`Error in checking Membership: ${JSON.stringify(error)}`);
    return false;
  }
};

botHelper.sendMessageToUser = async (chatId, text, options = {}) => {
  try {
    return await bot.sendMessage(chatId, text, options);
  } catch (error) {
    console.error(`Error in Sending Message: ${JSON.stringify(error)}`);
    throw error;
  }
};

botHelper.sendKeyboardToUser = async (chatId, text, buttons) => {
  const options = {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
  return botHelper.sendMessageToUser(chatId, text, options);
};

botHelper.answerCallbackQuery = async (callbackQueryId) => {
  try {
    return await bot.answerCallbackQuery(callbackQueryId);
  } catch (error) {
    console.error(`Error answering callback query: ${JSON.stringify(error)}`);
    throw error;
  }
};

botHelper.sendImageToUser = async (chatId, imageFile, caption) => {
  try {
    return await bot.sendPhoto(chatId, imageFile, {
      caption,
      contentType: "image/png"
    });
  } catch (error) {
    console.error(`Error Sending Image to User: ${JSON.stringify(error)}`);
    throw error;
  }
};

module.exports = botHelper;
