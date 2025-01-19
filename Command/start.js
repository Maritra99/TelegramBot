const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const keyBoard = require("../Static/Keyboard");
const message = require("../Static/message");
const staticUserState = require("../Static/userState");

module.exports = async (chatId, userState) => {
  const startText = message.START_MESSAGE;

  const state = userState ? userState : staticUserState["starting_bot"];

  await userStateModel.saveUserState(chatId, state);

  return await botHelper.sendKeyboardToUser(
    chatId,
    startText,
    keyBoard.START_MESSAGE_KEYBOARD
  );
};
