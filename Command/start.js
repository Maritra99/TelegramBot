const botHelper = require("../Bot/botHelper");
const keyBoard = require("../Static/Keyboard");

module.exports = async (chatId) => {
  const startText =
    "Welcome to the Financial Investment Bot! Type /help to see available commands.";

  return botHelper.sendKeyboardToUser(
    chatId,
    startText,
    keyBoard.PLANS_KEYBOARD
  );
};
