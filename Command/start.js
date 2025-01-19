const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const keyBoard = require("../Static/Keyboard");
const message = require("../Static/message");
const staticUserState = require("../Static/userState");

module.exports = async (chatId, userState) => {
  const startText = message.START_MESSAGE;

  if (userState) {
    await userStateModel.saveUserState(chatId, userState);
  }

  return await botHelper.sendKeyboardToUser(
    chatId,
    startText,
    keyBoard.START_MESSAGE_KEYBOARD
  );
};
