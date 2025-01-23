const bot = require("../Bot/botConfig");

exports.notifyErrorToAdmin = (errorMessage) => {
  const adminChatId = process.env.ERROR_GROUP_CHAT_ID;
  if (adminChatId) {
    return bot.sendMessage(adminChatId, errorMessage || "");
  }
};

// exports.notifyMessageToAdmin = (message) => {
//   const adminChatId = process.env.MESSAGE_GROUP_CHAT_ID;
//   if (adminChatId) {
//     return bot.sendMessage(adminChatId, message || "");
//   }
// };
