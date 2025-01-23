const start = require("../../Command/start");
const userState = require("../../Static/userState");

module.exports = async ({ userChatId }) => {
  await start(userChatId, userState["restart_process"]);
};
