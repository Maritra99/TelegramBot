const userState = require("../Static/userState");
const dashboard = require("./dashboard");

module.exports = async (chatId) => {
  return await dashboard(chatId, userState["cancel_amount"]);
};
