const botHelper = require("../Bot/botHelper");
const keyBoard = require("../Static/Keyboard");
const message = require("../Static/message");

module.exports = async (chatId) => {
  const startText = message.START_MESSAGE;
  return botHelper.sendKeyboardToUser(
    chatId,
    startText,
    keyBoard.START_MESSAGE_KEYBOARD
  );
};
