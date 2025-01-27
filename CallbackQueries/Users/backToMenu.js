const start = require("../../Command/start");
const userState = require("../../Static/userState");

module.exports = async ({ userChatId }) => {
  return await start({
    userChatId,
    userState: userState["back_menu"],
  });
};
