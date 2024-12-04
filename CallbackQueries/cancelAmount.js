const dashboard = require("./dashboard");

module.exports = async (chatId) => {
  return await dashboard(chatId);
};
