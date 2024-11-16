const start = require("../Command/start");

module.exports = async (chatId) => {
  await start(chatId);
};
