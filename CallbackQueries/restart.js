const start = require("../Command/start");
const userState = require("../Static/userState");

module.exports = async (chatId) => {
  await start(chatId, userState["restart_process"]);
};
