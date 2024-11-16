const botHelper = require("../Bot/botHelper");
const keyboard = require("../Static/Keyboard");
const message = require("../Static/message");

module.exports = (chatId) => {
  const messageToSend = message.PLAN_MESSAGE;
  const keyBoard = keyboard.PLANS_KEYBOARD;

  return botHelper.sendKeyboardToUser(chatId, messageToSend, keyBoard);
};
