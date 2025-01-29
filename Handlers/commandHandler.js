const start = require("../Command/start");
const help = require("../Command/help");
const userState = require("../Static/userState");

module.exports = (args) => {
  const { messageText } = args;
  const text = String(messageText).split(" ")[0].toLowerCase();

  if (text === "/start") {
    args = {
      ...args,
      userState: userState["start"],
    };

    start(args);
  } else if (text === "/help") {
    args = {
      ...args,
      userState: userState["help"],
    };

    help(args);
  }
};
