const botHelper = require("../Bot/botHelper");
const keyboard = require("../Static/Keyboard");
const message = require("../Static/message");

module.exports = async ({ userChatId }) => {
  const messageToSend = message.PLAN_MESSAGE;
  const keyBoard = keyboard.PLANS_KEYBOARD;

  return await botHelper.sendKeyboardToUser(
    userChatId,
    messageToSend,
    keyBoard
  );
};
