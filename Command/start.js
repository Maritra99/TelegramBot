const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const keyBoard = require("../Static/Keyboard");
const message = require("../Static/message");
const staticUserState = require("../Static/userState");

module.exports = async ({ userChatId, userState }) => {
  const startText = message.START_MESSAGE;

  if (userState) {
    await userStateModel.saveUserState(userChatId, userState);
  }

  return await botHelper.sendKeyboardToUser(
    userChatId,
    startText,
    keyBoard.START_MESSAGE_KEYBOARD
  );
};
